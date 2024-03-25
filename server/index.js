// import express from 'express';
// import session from 'express-session';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import {config} from "dotenv";
// import {UPLOADS_DIR} from "./constants.js";
//
// config();
//
// const app = express();
//
// app.use(cors({
//   credentials: true,
//   origin: process.env.CLIENT_HOST
// }));
//
// app.set('trust proxy', true);
//
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// }));
//
// await mongoose.connect(process.env.DB_HOST);
// app.use(express.urlencoded({extended: true}));
// app.use(PostController);
// app.use(UserController);
//
// app.use('/files', express.static(UPLOADS_DIR));
//
// app.listen(process.env.SERVER_PORT);

// app.js
import express from 'express';
import session from 'express-session';
import authRoutes from './controller/auth.js';
import protectedRoute from './middleware/protectedRoute.js';
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_HOST
}));

app.set('trust proxy', true);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

await mongoose.connect(process.env.DB_HOST);

app.use(authRoutes);
app.use(protectedRoute);

app.listen(process.env.PORT || 3000);
