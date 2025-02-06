"use client";

import { Product } from "@/app/types";
import AddToCartButton from "../../../components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: product, error, isLoading } = useQuery<Product>({
    queryKey: ["product"],
    queryFn: () => fetchProductById(params.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <div className="flex space-x-8 justify-center">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-2xl w-80 h-80 object-cover"
        />
        <Image
          src={product.images[1]}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-2xl w-80 h-80 object-cover"
        />
      </div>
      <CardContent>
        <div className="flex items-center gap-8 mb-4">
          <p className="text-2xl font-bold">
            {product.price.toLocaleString("pt-br", {
              currency: "BRL",
              style: "currency",
            })}
          </p>
          {product.stock === 0
            ? <p className="text-sm line-through">Esgotado</p>
            : <p className="text-sm">Disponíveis: {product.stock}</p>}
        </div>
        <p>{product.description}</p>
      </CardContent>
      <CardFooter>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
