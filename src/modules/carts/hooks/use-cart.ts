'use client'

import { useEffect, useState } from "react"
import usePagination from "@/hooks/use-pagination"
import { getAllCarts, getCartById } from "@/services/carts-services"
import { Cart, CartProduct } from "@/types"

import { useQuery } from "@tanstack/react-query"


export function useCarts() {
    const { page, setPage, limit, handlePageChange } = usePagination()

    const skip = (page - 1) * limit
    const { data: initialData, isLoading, isError } = useQuery(
        ['carts', skip, limit], 
        () => getAllCarts(skip, limit),
        {
            keepPreviousData: true,
        }
    )

    const paginatedCarts = initialData?.carts as Cart[] || []
    const totalItems = initialData?.total || 0

    const maxPage = Math.ceil(totalItems / limit) || 1

    // Prevent invalid page numbers
    useEffect(() => {
        if (page > maxPage && maxPage > 0) {
            setPage(maxPage)
        }
        if (page < 1) {
            setPage(1)
        }
    }, [page, maxPage, setPage])

    return {
        paginatedCarts, 
        isLoading, 
        isError, 
        setPage, 
        page, 
        limit, 
        maxPage, 
        skip, 
        handlePageChange,
        totalItems
    }
}

export function useOneCart(id: number) {
    const { data: initialData, isLoading, isError } = useQuery(['cart', id], () => getCartById(id))

    const [products, setProducts] = useState<CartProduct[]>([])

    useEffect(() => {
        setProducts(initialData?.products)
    }, [initialData])

    return { data: initialData, products, isLoading, isError }
}