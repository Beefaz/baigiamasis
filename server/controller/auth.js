import express from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import getValidationErrors from '../helpers/getValidationErrors.js'

dotenv.config();
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = new User({...req.body});
    await user.save();
    res.status(201).json({message: 'Sveikiname sėkmingai užsiregistravus!'});
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({error: 'Toks vartotojas jau egzistuoja'});
    if (error.name === "ValidationError") return resp.status(400).send({errors: getValidationErrors(error)});

    res.status(500).json({error: 'Serverio klaida'});
  }
});

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (!user) {
      return res.status(400).json({error: 'Toks vartotojas neegzistuoja'});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({error: 'Netinkamas slaptažodis'});
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_KEY, {
      expiresIn: '7d',
    });

    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({error: 'Serverio klaida'});
  }
});


export default router;
