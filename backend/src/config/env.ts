import z from 'zod';
import dotenv from 'dotenv';

const envTypes = ['production', 'development'];
const path = envTypes.includes(process.env.NODE_ENV || 'production')
  ? `.env.${process.env.NODE_ENV}`
  : '.env.development';

dotenv.config({ path });

const envSchema = z.object({
  MONGODB_URI: z.string().describe('MongoDB connection string'),
  PORT: z.coerce.number().default(3000).describe('Port number'),
});

const envVariables = envSchema.safeParse(process.env);

if (!envVariables.success) {
  console.error(envVariables.error);
  process.exit(1);
}

export const envs = envVariables.data;
