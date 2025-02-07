"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { SortDirection, SortOption } from "../../src/app/types";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

type SortControlsProps = {
  onSort: (option: SortOption, direction: SortDirection) => void;
};

export default function SortControls({ onSort }: SortControlsProps) {
  const [sortState, setSortState] = useState<{
    option: SortOption | null;
    direction: SortDirection;
  }>({
    option: null,
    direction: "asc",
  });

  const handleSort = (option: SortOption) => {
    const newDirection =
      sortState.option === option && sortState.direction === "asc"
        ? "desc"
        : "asc";
    setSortState({ option, direction: newDirection });
    onSort(option, newDirection);
  };

  const getSortIcon = (option: SortOption) => {
    if (sortState.option !== option) return <ArrowUpDown className="h-4 w-4" />;
    return sortState.direction === "asc"
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Button
        variant={sortState.option === "price" ? "default" : "outline"}
        onClick={() => handleSort("price")}
      >
        Preço {getSortIcon("price")}
      </Button>
      <Button
        variant={sortState.option === "name" ? "default" : "outline"}
        onClick={() => handleSort("name")}
      >
        Nome {getSortIcon("name")}
      </Button>
      <Button
        variant={sortState.option === "createdAt" ? "default" : "outline"}
        onClick={() => handleSort("createdAt")}
      >
        Adicionado {getSortIcon("createdAt")}
      </Button>
    </div>
  );
}
