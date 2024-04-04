import {Schema, model} from "mongoose";

const projectSchema = new Schema({
    title: {
      type: String,
      required: [true, 'Pavadinimas yra privalomas'],
      minLength: [10, 'Per trumpas pavadinimas'],
      maxLength: [50, 'Per ilgas pavadinimas'],
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
      required: [true, 'Aprašymas yra privalomas'],
      minLength: [10, 'Per trumpas aprašymas'],
      maxLength: [2000, 'Per ilgas aprašymas'],
    },
    debateDate: {
      type: Date,
      required: [true, 'Svarstymo data yra privaloma'],
      default: Date.now(),
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'rejected', 'accepted', 'noData'],
        message: '{VALUE} - toks statusas neegzistuoja'
      },
      default: 'pending',
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
);


export default model('Project', projectSchema);


