import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
      console.log(
        `[${new Date().toISOString()}] ${collectionName}.${methodName}`,
        methodArgs,
      );
    });

    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected...');
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
