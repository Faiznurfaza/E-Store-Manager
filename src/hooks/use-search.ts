'use client'

import { parseAsString, useQueryState } from "next-usequerystate"
import { useDebounce } from 'use-debounce'
import { useEffect } from "react"

export function useSearch(value: string): [string, (v: string) => void] {
    const [search, setSearch] = useQueryState('search', parseAsString.withDefault(""));
    const [debouncedValue] = useDebounce(search || value, 1000);

    useEffect(() => {
        setSearch(debouncedValue || "");
    }, [debouncedValue, setSearch]);

    return [search, setSearch];
}