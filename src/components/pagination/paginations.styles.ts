import { useMemo } from "react";
import { useDarkMode } from "@/utils/use-darkmode";

export function PaginationStyles(page: number, maxPage: number) {
    const { isDarkMode } = useDarkMode()
    return useMemo(() => {
        const PaginationContainer = isDarkMode
            ? "flex flex-col lg:flex-row items-center justify-between mt-4 dark:bg-gray-800"
            : "flex flex-col lg:flex-row items-center justify-between mt-4";

        const PaginationText = isDarkMode
            ? "text-gray-400 text-sm mb-2 lg:mb-0"
            : "text-gray-600 text-sm mb-2 lg:mb-0";

        const PaginationPrevButton = `px-4 py-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"
            } ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`;

        const PaginationNextButton = `px-4 py-2 ${isDarkMode ? "text-blue-400" : "text-blue-500"
            } ${page === maxPage ? "opacity-50 cursor-not-allowed" : ""}`;

        return {
            PaginationContainer,
            PaginationText,
            PaginationPrevButton,
            PaginationNextButton,
        };
    }, [isDarkMode, page, maxPage]);
}