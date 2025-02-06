"use client";

import { useCart } from "../context/CartContext";
import type { Product } from "../app/types";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return <Button onClick={() => addToCart(product)}>Add to Cart</Button>;
}
