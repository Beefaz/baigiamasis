import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

const projectSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Aprašymas yra privalomas'],
    minLength: [10, 'Per trumpas aprašymas'],
    maxLength: [2000, 'Per ilgas aprašymas'],
  },
  status: {
    type: String,
    enum: {
      values: ['Pateiktas', 'Atmestas', 'Priimtas', 'Nepakanka duomenų'],
      message: '{VALUE} - toks statusas neegzistuoja'
    }
  },
  photo: {
    type: String,
  },
  debateDate: {
    type: Date,
    // required: [true, 'Svarstymo data yra privaloma'],
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const projectModel = model('Project', projectSchema);

export default projectModel;


