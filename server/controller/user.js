import express from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import getValidationErrors from '../helpers/getValidationErrors.js'
import verifyJWT from "../middleware/verifyJWT.js";
import Project from "../models/project.js";

dotenv.config();
const router = express.Router();

router.post('/register',
  async (req, resp) => {
    try {
      const user = new User({...req.body});
      await user.save();
      resp.status(201).json({message: 'Registracija sėkminga'});
    } catch (error) {
      if (error.name === "ValidationError") return resp.status(400).send({errors: getValidationErrors(error)});
      resp.status(500).json({error: 'Serverio klaida'});
    }
  }
);

router.post('/login',
  async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});

      if (!user) {
        return res.status(400).json({error: 'Toks vartotojas neegzistuoja'});
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({error: 'Netinkamas slaptažodis'});
      }

      const payload = {
        username: `${user.name} ${user.surname}`,
        id: user._id,
        role: user.role,
      }

      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '7d',
      });
      res.status(200).json({token, userName: `${user.name} ${user.surname}`, id: user._id, role: user.role});
    } catch (error) {
      res.status(500).json({error: 'Serverio klaida'});
    }
  }
);

router.get('/user',
  verifyJWT,
  async (req, resp) => {
    try {
      const user = await User.findOne({_id: req.tokenData.userId});
      resp.status(200).json({userName: `${user.name} ${user.surname}`});
    } catch (error) {
      resp.status(500).json({error: 'Serverio klaida'});
    }
  }
);

export default router;
