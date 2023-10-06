'use client'

import { useEffect, useState } from "react"
import usePagination from "@/hooks/use-pagination"
import { getAllCarts, getCartById } from "@/services/carts-services"
import { Cart, CartProduct } from "@/types"

import { useQuery } from "@tanstack/react-query"


export function useCarts() {
    const { page, setPage, limit, handlePageChange } = usePagination()

    const skip = (page - 1) * limit
    const { data: initialData, isLoading, isError } = useQuery(['carts'], () => getAllCarts())

    const paginatedCarts = initialData?.carts.slice(skip, skip + limit) as Cart[]
    const totalItems = initialData?.total

    const maxPage = Math.ceil(totalItems / limit)

    if (page > maxPage) {
        setPage(maxPage)
    }

    return {
        paginatedCarts, isLoading, isError, setPage, page, limit, maxPage, skip, handlePageChange
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