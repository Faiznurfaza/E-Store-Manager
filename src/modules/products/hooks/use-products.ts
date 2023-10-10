import { useQuery } from '@tanstack/react-query';
import { useMemo, useCallback, useEffect, useState } from 'react';

import { getAllProducts } from '@/services/products-services';
import usePagination from '@/hooks/use-pagination';
import { useSearch } from '@/hooks/use-search';
import { Product } from '@/types';

type FilteredProductsTypes = {
  filteredBrands: string[];
  filteredCategories: string[];
  minPrice: number;
  maxPrice: number;
};

export function useProducts({
  filteredBrands = [],
  filteredCategories = [],
  minPrice,
  maxPrice,
}: FilteredProductsTypes) {
  const { page, setPage, limit, handlePageChange } = usePagination();
  const [searchQuery, setSearchQuery] = useSearch("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const skip = (page - 1) * limit;
  const { data: initialData, isLoading, isError } = useQuery(["products"], () => getAllProducts());

  const categoryList = useMemo(() => {
    if (initialData && initialData.products) {
      return [...new Set(initialData.products.map((p: { category: Product['category'] }) => p.category))] as string[];
    }
    return [];
  }, [initialData]);

  const brandList = useMemo(() => {
    if (initialData && initialData.products) {
      return [...new Set(initialData.products.map((p: { brand: Product["brand"] }) => p.brand))] as string[];
    }
    return [];
  }, [initialData]);

  const filterProducts = useCallback(
    ({ search, brands, categories, priceRange }: { search: string; brands: string[]; categories: string[]; priceRange: [number, number] }) => {
      if (!initialData) return [];

      return initialData.products.filter((product: Product) =>
        product.title.toLowerCase().includes(search) &&
        (brands.length === 0 || brands.includes(product.brand)) &&
        (categories.length === 0 || categories.includes(product.category)) &&
        (priceRange[0] < 0 || priceRange[1] <= 0 || (product.price >= priceRange[0] && product.price <= priceRange[1]))
      );
    },
    [initialData]
  );

  useEffect(() => {
    if (initialData) {
      const filtered = filterProducts({
        search: searchQuery,
        brands: filteredBrands,
        categories: filteredCategories,
        priceRange: [minPrice, maxPrice],
      });

      setTotalRecords(filtered.length);
      setFilteredProducts(filtered.slice(skip, skip + limit));
    }

    if (!page) setPage(1);
  }, [initialData, searchQuery, filteredBrands, filteredCategories, minPrice, maxPrice, skip, limit, filterProducts, page, setPage]);

  const maxPage = useMemo(() => Math.ceil(totalRecords / limit), [totalRecords, limit]);

  if (page > maxPage) {
    setPage(maxPage);
  }

  return {
    paginatedProducts: filteredProducts,
    isLoading,
    isError,
    setPage,
    page,
    limit,
    maxPage,
    skip,
    handlePageChange,
    brandList,
    categoryList,
    setSearchQuery
  };
}