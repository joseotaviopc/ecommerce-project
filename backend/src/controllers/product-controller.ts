import { Request, Response } from 'express';
import { productService } from '../services/product-service';
import mongoose from 'mongoose';

export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }

  const productId = new mongoose.Types.ObjectId(id);
  try {
    const product = await productService.getProduct(productId);
    res.status(201).json(product);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};
