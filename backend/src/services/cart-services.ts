import Cart, { ICart } from '../models/cart-model';
import mongoose from 'mongoose';

const USER_ID = new mongoose.Types.ObjectId('60f0b2e9d1f5c7f1d0d3b5e2');

const createCart = async (): Promise<ICart> => {
  return await Cart.create({
    userId: new mongoose.Types.ObjectId(USER_ID),
    items: [],
  });
};

type EditCartDTO = {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
};

const editCart = async ({
  userId,
  productId,
  quantity,
  price,
}: EditCartDTO): Promise<ICart | null> => {
  const cart = await Cart.findOne({ userId });

  if (cart) {
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId),
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].price = price;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    return await cart.save();
  } else {
    return await Cart.create({
      userId,
      items: [{ productId, quantity, price }],
    });
  }
};

type RemoveCartDTO = {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
};

const removeItemFromCart = async ({
  userId,
  productId,
}: RemoveCartDTO): Promise<ICart | null> => {
  const cart = await Cart.findOne({ userId });

  if (cart) {
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));

    return await cart.save();
  }

  return null;
};

export const cartService = { createCart, editCart, removeItemFromCart };
