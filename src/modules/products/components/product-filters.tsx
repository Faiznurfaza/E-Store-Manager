"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { Serializers, SetValues } from "next-usequerystate";

type ProductFiltersProps = {
  brandList: string[];
  categoryList: string[];
  filteredBrands: string[] | null;
  filteredCategories: string[] | null;
  minPrice: number;
  maxPrice: number;
  setFilterList: SetValues<{
    brand: Serializers<string[]>;
    category: Serializers<string[]>;
    minPrice: Serializers<number>;
    maxPrice: Serializers<number>;
  }>;
  setPaginationState: SetValues<{
    page: Serializers<number>
    limit: Serializers<number>
  }>
};

export const ProductFilters = ({
    brandList,
    categoryList,
    filteredBrands,
    filteredCategories,
    minPrice,
    maxPrice,
    setFilterList,
    setPaginationState
}: ProductFiltersProps) => {
  return <main>
    <form></form>
  </main>
}

export default ProductFilters