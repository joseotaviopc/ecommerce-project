export type Product = {
  _id: number;
  name: string;
  stock: number;
  category: string;
  price: number;
  description: string;
  images: string[];
  createdAt: Date;
};

export type CartItem = Product & { quantity: number };

export type SortOption = "price" | "name" | "createdAt";
export type SortDirection = "asc" | "desc";
