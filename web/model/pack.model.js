import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const packSchema = new Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  thumbnail: {
    type: String,
  },
  genre: {
    type: String,
  },
  price: {
    type: Number,
  },
});

export const packsModel = mongoose.model('Pack', packSchema);
