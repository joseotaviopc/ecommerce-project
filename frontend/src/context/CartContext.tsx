"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, Product } from "../app/types";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  isInCart: (productId: number) => boolean;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "ecommerce_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((
          item,
        ) => (item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item)
        );
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([...prevCart, { ...product, quantity }]));
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.filter((item) => item._id !== productId)));
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const isInCart = (productId: number) => {
    return cart.some((item) => item._id === productId);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((
        item,
      ) => (item._id === productId
        ? { ...item, quantity: Math.max(1, quantity) }
        : item)
      )
    );
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.map((
      item,
    ) => (item._id === productId
      ? { ...item, quantity: Math.max(1, quantity) }
      : item)
    )));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
