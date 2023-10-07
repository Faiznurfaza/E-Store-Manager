import React, { useMemo } from 'react'
import { useDarkMode } from '@/utils/use-darkmode'

export function CartDetailsStyles() {
    const { isDarkMode } = useDarkMode()
    return useMemo(() => {
        const cardStyles: {
            Content: string | undefined;
            Head: React.CSSProperties | undefined;
            Body: React.CSSProperties | undefined;
        }= {
            Content: isDarkMode ? "bg-gray-900" : "bg-gray-100",
            Head: isDarkMode ? {color: "white"} : undefined,
            Body: isDarkMode ? {width:"450px", color: "white"} : undefined,
        };

        return cardStyles
    }, [isDarkMode])
}