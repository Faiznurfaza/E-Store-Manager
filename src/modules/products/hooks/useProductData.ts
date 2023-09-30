'use client';

import { useQuery } from '@tanstack/react-query';

import getAllProducts from '@/services/products-services';
import usePagination from '@/hooks/usePagination';
import { Product } from '@/types';

export default function usePaginatedProductData() {
  const { page, setPage, limit, handlePageChange} = usePagination();


  const skip = (page - 1) * limit;
  const { data: initialData, isLoading, isError } = useQuery(["products"], () => getAllProducts());

  const paginatedProducts = initialData?.products.slice(skip, skip + limit) as Product[]
  const totalItems = initialData?.total

  const maxPage = Math.ceil(totalItems / limit);

  if (page > maxPage) {
    setPage(maxPage);
  }

  return {
    paginatedProducts,
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