import Product, { IProduct } from '../models/product-model';

type ProductResponse = Pick<IProduct, '_id' | 'name' | 'price'>;

const getAllProducts = async (): Promise<ProductResponse[]> => {
  return await Product.find();
};

const getProduct = async (
  productId: Pick<IProduct, '_id'>,
): Promise<ProductResponse | null> => {
  return await Product.findById(productId);
};

export const productService = { getAllProducts, getProduct };
