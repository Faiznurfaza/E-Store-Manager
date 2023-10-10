'use client'

import { useMemo } from 'react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '@/services/products-services'

import { Product } from '@/types'

export function useProducts() {
    const { data: initialData, isLoading, isError } = useQuery(['products'], () => getAllProducts())

    const [brandRecords, setBrandRecords] = useState<Record<string, number>>({})
    const [categoryRecords, setCategoryRecords] = useState<Record<string, number>>({})

    useMemo(() => {
        if (initialData) {
            const { products } = initialData;
            let brandList: Record<string, number> = {};
            let categoryList: Record<string, number> = {};

            products.forEach((p: Product) => {
                if (brandList[p.brand]) brandList[p.brand] = brandList[p.brand] += 1;
                else brandList[p.brand] = 1;

                if (categoryList[p.category])
                    categoryList[p.category] = categoryList[p.category] += 1;
                else categoryList[p.category] = 1;
            });

            setBrandRecords(brandList);
            setCategoryRecords(categoryList);
        }
    }, [initialData]);

    return {
        brandRecords,
        categoryRecords,
        isLoading,
        isError
    }
}