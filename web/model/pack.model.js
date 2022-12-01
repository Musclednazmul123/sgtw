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
  variants:[
    {
      filesurl:{
        type:String
      },
      title: String,
      price: {
        type: Number,
      },
      variant_id:{
        type:String,
      },
      sales:Number,
      downloads:Number,
      status:Boolean,
    }
  ],
  price: {
    type: Number,
  },
});

export const packsModel = mongoose.model('Pack', packSchema);