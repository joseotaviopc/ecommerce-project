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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Product, SortDirection, SortOption } from "../app/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import SortControls from "./SortControls";

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:3000/api/products/all");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[] | undefined>();

  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const sortProducts = (
    option: SortOption = "name",
    direction: SortDirection,
  ) => {
    if (data) {
      const sortedProducts = [...data].sort((a, b) => {
        if (option === "price") {
          return direction === "asc" ? a.price - b.price : b.price - a.price;
        } else if (option === "name") {
          return direction === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (option === "createdAt") {
          return direction === "asc"
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
      setProducts(sortedProducts);
    }
  };

  useEffect(() => {
    sortProducts("name", "asc");
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <SortControls onSort={sortProducts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <Card key={product._id} className="flex flex-col gap-4">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>

            <div className="w-full flex items-center justify-center px-12">
              <Carousel
                opts={{
                  align: "center",
                }}
                className="w-[14rem] flex items-center"
              >
                <CarouselContent className="flex items-center">
                  {product.images.map((image) => (
                    <CarouselItem key={image} className="pl-7">
                      <Link
                        href={`/products/${product._id}`}
                        className=""
                      >
                        <Image
                          src={image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="rounded-2xl w-[12.5rem] h-[12.5rem] object-cover"
                        />
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-6" />
                <CarouselNext className="-right-6" />
              </Carousel>
            </div>

            <CardContent>
              <div className="flex items-center gap-8">
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
              <p className="mt-8 text-gray-400">
                Descrição: {product.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild disabled={product.stock === 0}>
                <Link href={`/products/${product._id}`}>View Details</Link>
              </Button>
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
