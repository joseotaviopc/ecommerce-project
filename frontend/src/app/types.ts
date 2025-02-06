export type Product = {
  _id: number;
  name: string;
  stock: number;
  category: string;
  price: number;
  description: string;
  images: string[]
};

export type CartItem = Product & { quantity: number };
