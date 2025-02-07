"use client";

import { useCart } from "../context/CartContext";
import type { Product } from "../app/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart, isInCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (isInCart(product._id)) {
      updateQuantity(product._id, quantity);
      toast({
        title: "Cart updated",
        description: `${product.name} quantity updated in your cart.`,
      });
    } else {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${product.name} added to your cart.`,
      });
    }
    setQuantity(1);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) =>
          setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
        className="w-20"
      />
      <Button onClick={handleAddToCart}>
        {isInCart(product._id) ? "Atualizar" : "Adicionar"}
      </Button>
    </div>
  );
}
