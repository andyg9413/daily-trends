import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_DB_URI: string =
  process.env.MONGO_DB_URI || 'mongodb://localhost:27017/daily-trends';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('DB is connected');
  } catch (err) {
    console.error('Failed to connect to the database', err);
    process.exit(1);
  }
};

export default connectDB;
