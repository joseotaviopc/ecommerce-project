import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { envs } from './env';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
      console.log(
        `[${new Date().toISOString()}] ${collectionName}.${methodName}`,
        // methodArgs,
      );
    });

    const mongoUri = envs.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('The MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected...');
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
