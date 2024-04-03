import express from 'express';
import UserController from './controller/user.js';
import ProjectController from './controller/project.js';
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
await mongoose.connect(process.env.DB_HOST);

app.use(UserController);
app.use(ProjectController);
app.use('/uploads', express.static(process.env.UPLOADS_DIR));

app.listen(process.env.PORT || 3000);
