import mongoose from 'mongoose';
import { z } from 'zod';

export const cartSchema = z.object({
  productId: z.instanceof(mongoose.Types.ObjectId),
  quantity: z.number().int(),
  price: z.number().int(),
});

export const removeItemFromCartSchema = z.object({
  productId: z.instanceof(mongoose.Types.ObjectId),
});
