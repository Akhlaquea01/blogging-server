import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { DB_NAME } from '../constants';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  try {
    `${MONGODB_URI}/${DB_NAME}`
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}; 