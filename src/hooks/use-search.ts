'use client'

import { parseAsString, useQueryState } from "next-usequerystate"
import { useDebounce } from 'use-debounce'
import { useEffect } from "react"

export function useSearch(value: string): [string, (v: string) => void] {
    const [search, setSearch] = useQueryState('q', parseAsString
        .withOptions({
            history: 'push',

        })
        .withDefault(""))
    const [debouncedValue] = useDebounce(search || value, 300);

    useEffect(() => {
        setSearch(debouncedValue || null);
    }, [debouncedValue, setSearch]);

    return [debouncedValue, setSearch];
}