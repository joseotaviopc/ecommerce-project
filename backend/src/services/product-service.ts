import Product, { IProduct } from '../models/product-model';

const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

const getProduct = async (
  productId: Pick<IProduct, '_id'>,
): Promise<IProduct | null> => {
  return await Product.findById(productId);
};

export const productService = { getAllProducts, getProduct };
