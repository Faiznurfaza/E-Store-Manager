'use client'

import usePagination from "@/hooks/use-pagination"
import getAllCarts from "@/services/carts-services"
import { Cart } from "@/types"

import { useQuery } from "@tanstack/react-query"

export default function usePaginatedCartData() {
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