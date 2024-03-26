import express from 'express';
// import session from 'express-session';
import protectedRoute from './middleware/protectedRoute.js';
import AuthController from './controller/auth.js';
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

// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: false
// }));

await mongoose.connect(process.env.DB_HOST);

app.use(AuthController);
app.use(ProjectController);
app.use(protectedRoute);
app.use('/uploads', express.static(process.env.UPLOADS_DIR));

app.listen(process.env.PORT || 3000);
