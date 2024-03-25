import express from "express";
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({...req.body});
    console.log(user);
    await user.save();
    res.status(201).json({message: 'Sveikiname sėkmingai užsiregistravus!'});

  } catch (error) {
    if (error.name === "ValidationError") {
      const {errors} = error;
      Object.keys(errors).forEach((key) => {
        errors[key] = errors[key].message;
      });

      console.log(error);
      return res.status(400).send({type: 'Validation error', errors: errors });
    }
    res.status(500).json({message: 'Registracija nesėkminga'});
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) {
      return res.status(401).json({error: 'Toks vartotojas neegzistuoja'});
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
    res.status(500).json({error: 'Prisijungimas nesėkmingas'});
  }
});

export default router;
