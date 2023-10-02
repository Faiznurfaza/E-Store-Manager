'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useCallback, useEffect, useState } from 'react';

import getAllProducts from '@/services/products-services';
import usePagination from '@/hooks/use-pagination';
import { useSearch } from '@/hooks/use-search';
import { Product } from '@/types';

type filteredProductsTypes = {
  filteredBrands: string[];
  filteredCategories: string[];
  minPrice: number;
  maxPrice: number;
}

export default function useProducts({
  filteredBrands = [],
  filteredCategories = [],
  minPrice,
  maxPrice
}: filteredProductsTypes) {
  const { page, setPage, limit, handlePageChange } = usePagination();
  const [searchQuery, setSearchQuery] = useSearch("")
  const [filteredData, setFilteredData] = useState<Product[]>([])


  const skip = (page - 1) * limit;
  const { data: initialData, isLoading, isError } = useQuery(["products"], () => getAllProducts());

  const paginatedProducts = initialData?.products.slice(skip, skip + limit) as Product[]
  const totalItems = initialData?.total



  const categoryList = useMemo(() => {
    if (initialData && initialData.products) {
      return [...new Set(initialData.products.map((p: { category: Product['category'] }) => p.category))] as string[]
    }

    return []
  }, [initialData])

  const brandList = useMemo(() => {
    if (initialData && initialData.products) {
      return [...new Set(initialData.products.map((p: { brand: Product["brand"] }) => p.brand))] as string[]
    }

    return []
  }, [initialData])



  const filterProducts = useCallback(
    ({
      search,
      brands,
      categories,
      priceRange
    }: {
      search: string;
      brands: string[];
      categories: string[];
      priceRange: [number, number];
    }) => {
      if (initialData) {
        let filteredProducts = initialData?.products.filter((product: Product) =>
          product.title.toLowerCase().includes(search)
        );

        if (brands.length > 0 && brands[0] !== "") {
          filteredProducts = filteredProducts.filter((product: Product) =>
            brands.includes(product.brand)
          );
        }

        if (categories.length > 0 && categories[0] !== "") {
          filteredProducts = filteredProducts.filter((product: Product) =>
            categories.includes(product.category)
          );
        }

        if (priceRange[0] >= 0 && priceRange[1] > 0) {
          filteredProducts = filteredProducts.filter(
            (product: Product) =>
              product.price >= priceRange[0] && product.price <= priceRange[1]
          );
        }

        return filteredProducts;
      }

      return [];
    },
    [initialData, paginatedProducts]
  );

  useEffect(() => {
    if (initialData) {
      const filteredProducts = filterProducts({
        search: searchQuery,
        brands: filteredBrands,
        categories: filteredCategories,
        priceRange: [minPrice, maxPrice]
      })

      setFilteredData(filteredProducts.slice(skip, skip + limit))
    }
  }, [initialData, searchQuery, filteredBrands, filteredCategories, minPrice, maxPrice, skip, limit])

  const maxPage = useMemo(() => Math.ceil(totalItems / limit), [totalItems, limit])

  if (page > maxPage) {
    setPage(maxPage)
  }
  return {
    paginatedProducts: filteredData,
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
    searchQuery
  };
}