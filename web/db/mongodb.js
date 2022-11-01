import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/sephbeats';

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url ? url : connectionString);

    return console.log(`Database connected successfull`);
  } catch (error) {
    console.log(`Error in connected to database ${error.message}`);
    return;
  }
};
