"use client";

import { useCart } from "../../context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <Card>
          <CardHeader>
            <CardTitle>Your Items</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center py-4"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p>
                    {(item.price * item.quantity).toLocaleString("pt-br", {
                      currency: "BRL",
                      style: "currency",
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item._id,
                        Number.parseInt(e.target.value) || 1,
                      )}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            <Separator className="my-4" />
          </CardContent>
          <CardFooter>
            <div className="text-xl font-bold mr-4">
              Total: {total.toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </div>
            <Button variant="destructive" onClick={clearCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
