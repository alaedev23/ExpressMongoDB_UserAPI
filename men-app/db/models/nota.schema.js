import { Schema, model } from 'mongoose';

const notaSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
});

const Nota = model('Nota', notaSchema);

export default Nota;
