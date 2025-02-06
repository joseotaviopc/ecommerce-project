"use client";

import Link from "next/link";
import AddToCartButton from "../components/AddToCartButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "../app/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/api/products/all");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function ProductList() {
  const { data: products, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products?.map((product) => (
        <Card key={product._id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          {product.images[0] ? 
          <Link href={`/products/${product._id}`} className="">
            <Image src={product.images[0]} alt={product.name} width={300} height={300} className="rounded-2xl w-80 h-80 object-cover mx-auto"/>
            </Link> : null}
          <CardContent>
            <p className="text-2xl font-bold">{product.price.toLocaleString('pt-br',{
              currency: 'BRL',
              style: 'currency'
            })}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/products/${product._id}`}>View Details</Link>
            </Button>
            <AddToCartButton product={product} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
