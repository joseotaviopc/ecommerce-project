import { Request, Response } from 'express';
import { cartService } from '../services/cart-services';
import mongoose from 'mongoose';
import { productService } from '../services/product-service';

export const createCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await cartService.createCart();
    res.json(products);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
};

export const editCart = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { productId, quantity, price } = req.body;

  if (!id || !productId || !quantity || !price) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }

  const userId = new mongoose.Types.ObjectId(id);
  const findProductId = new mongoose.Types.ObjectId(productId);

  try {
    const hasProduct = await productService.getProduct(findProductId);

    if (!hasProduct) {
      res.status(404).json({ error: 'Product not found' });
    }

    const product = await cartService.editCart({
      userId,
      productId,
      quantity,
      price,
    });
    res.status(201).json(product);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

export const removeItemFromCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { productId } = req.body;

  if (!id || !productId) {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }

  const userId = new mongoose.Types.ObjectId(id);

  try {
    const product = await cartService.removeItemFromCart({ userId, productId });
    res.status(201).json(product);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};
