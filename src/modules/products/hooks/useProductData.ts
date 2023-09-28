'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import getAllProducts from '@/services/products-services';
import usePagination from '@/hooks/usePagination';
import { Product } from '@/types/products';

export function useProductData() {
  const { page, setPage, limit, handlePageChange} = usePagination();


  const skip = (page - 1) * limit;
  const { data: initialData, isLoading, isError } = useQuery(["products"], () => getAllProducts());

  const products = initialData?.products.slice(skip, skip + limit) as Product[]
  const totalItems = initialData?.total

  const maxPage = Math.ceil(totalItems / limit);

  if (page > maxPage) {
    setPage(maxPage);
  }

  return {
    products,
    isLoading,
    isError,
    setPage,
    page,
    limit,
    maxPage,
    skip,
    handlePageChange,
  };
}