'use client'

import { parseAsInteger, useQueryState } from "next-usequerystate"

export default function usePagination() {
    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
    const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10))

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
    };

    return {
        page,
        setPage,
        limit,
        handlePageChange,
        handleLimitChange,
    };
};