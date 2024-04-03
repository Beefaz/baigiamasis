import {Router} from "express";
import Project from "../models/project.js";
import upload from "../middleware/photoUpload.js";
import {rm} from "node:fs";
import getValidationErrors from '../helpers/getValidationErrors.js'
import verifyJWT from "../middleware/verifyJWT.js";

const router = Router();

router.get('/projects',
  verifyJWT,
  async (req, resp) => {
    try {
      const projects = await Project.find().populate('author', ['name', 'surname']).sort({created_at: 1});
      resp.json(projects);
    } catch (error) {
      resp.status(500).json({error: 'Serverio klaida'});
    }
  }
);

router.post(
  '/projects/new',
  verifyJWT,
  upload.single('photo'),
  async (req, resp) => {
    try {
      const newProject = await Project.create({
        ...req.body,
        photo: req?.file?.filename,
        created_at: Date.now(),
        author: req.tokenData.id
      });

      await newProject.save();

      resp.status(201).json({message: 'Projektas sėkmingai patalpintas.'});
    } catch (error) {
      if (error.name === "ValidationError") return resp.status(400).send({errors: getValidationErrors(error)});
      resp.status(500).json({error: 'Serverio klaida'});
    }
  }
);

router.get('/projects/:id',
  verifyJWT,
  async (req, resp) => {
    try {
      const project = await Project.findById(req.params.id).populate('author', ['name', 'surname']);

      if (!project) {
        return resp.status(404).json({error: 'Įrašas neegzistuoja'})
      }

      resp.json(project);
    } catch (error) {
      resp.status(500).json({error: 'Serverio klaida'});
    }
  }
);

router.put('/projects/:id',
  verifyJWT,
  upload.single('photo'),
  async (req, resp) => {
    try {
      const post = await Project.findById(req.params.id);
      let photoObject = {};

      if (post?.photo && req.file?.filename) {
        await rm(`${process.env.UPLOADS_DIR}/${post.photo}`, () => console.log(`removed: ${post.photo}`));
        photoObject = {photo: req.file?.filename};
      }

      await Project.findByIdAndUpdate(req.params.id, {
        ...req.body,
        ...photoObject,
      }, {new: true});

      resp.status(200).json({message: 'Projektas sėkmingai atnaujintas'});
    } catch (error) {
      resp.status(500).json({error: 'Serverio klaida'});
    }
  }
);

router.delete('/projects/:id',
  verifyJWT,
  async (req, resp) => {
    try {
      const deletedProject = await Project.findById(req.params.id);

      if (deletedProject?.photo) {
        await rm(`${process.env.UPLOADS_DIR}/${deletedProject.photo}`, () => console.log(`removed: ${deletedProject.photo}`));
      }

      await Project.findByIdAndDelete(req.params.id);

      resp.status(200).json({message: 'Projektas sėkmingai pašalintas'});
    } catch {
      resp.status(500).json({error: 'Serverio klaida'});
    }
  }
);

export default router;
