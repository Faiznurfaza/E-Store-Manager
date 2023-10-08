import { useDarkMode } from '@/utils/use-darkmode'

export function CartDetailsStyles() {
    const { isDarkMode } = useDarkMode()
    const cardStyles = {
        Content: isDarkMode ? "bg-gray-900" : "bg-gray-100",
        Head: isDarkMode ? { color: "white" } : undefined,
        Body: isDarkMode ? { width: "450px", color: "white" } : { width: "450px"},
    };

    return cardStyles;
}