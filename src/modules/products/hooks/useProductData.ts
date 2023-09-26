'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Product } from '@/types/products'

async function getAllProducts() {
    const response = await axios.get('https://dummyjson.com/products')
    return response.data.products as Product[]
}

export function useProductData() {
    const { data: products, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAllProducts,
      });
    
      return {
        products,
        isLoading,
        isError,
      };
}