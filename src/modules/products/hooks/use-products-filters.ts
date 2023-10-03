'use client'

import { useQueryStates, parseAsArrayOf, parseAsString, parseAsInteger } from "next-usequerystate"

export default function useProductFilters() {
    const [filters, setFilters] = useQueryStates({
        brand: parseAsArrayOf(parseAsString).withDefault([]),
        category: parseAsArrayOf(parseAsString).withDefault([]),
        minPrice: parseAsInteger.withDefault(0),
        maxPrice: parseAsInteger.withDefault(0)
    },
    {
        history: 'push'
    })

    return {
        filteredBrands: filters.brand,
        filteredCategories: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        setFilters
    }
}