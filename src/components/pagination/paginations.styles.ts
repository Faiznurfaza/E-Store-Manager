import { useDarkMode } from "@/utils/use-darkmode";

export function PaginationStyles(page: number, maxPage: number) {
    const { isDarkMode } = useDarkMode()
    const baseStyle = {
        Container: "flex flex-col lg:flex-row items-center justify-between mt-4",
        Text: "flex text-sm mb-2 ml-2 lg:mb-0",
        ButtonContainer: "flex space-y-2 lg:space-y-0 lg:space-x-2 items-center",
        Button: "px-4 py-2",
        Icon: "h-4 w-4",
        Disabled: "opacity-50 cursor-not-allowed",
        Dark: {
            Container: "bg-gray-800",
            Text: "text-gray-200",
            Button: "text-blue-400",
        },
        Light: {
            Text: "text-gray-600",
            Button: "text-blue-500",
        },
    };

    const paginationStyles = {
        Container: `${baseStyle.Container} ${isDarkMode ? baseStyle.Dark.Container : ''}`,
        Text: `${baseStyle.Text} ${isDarkMode ? baseStyle.Dark.Text : baseStyle.Light.Text}`,
        Icon: `${baseStyle.Icon}`,
        ButtonContainer: `${baseStyle.ButtonContainer}`,
        PrevButton: `${baseStyle.Button} ${isDarkMode ? baseStyle.Dark.Button : baseStyle.Light.Button} ${page === 1 ? baseStyle.Disabled : ''}`,
        NextButton: `${baseStyle.Button} ${isDarkMode ? baseStyle.Dark.Button : baseStyle.Light.Button} ${page === maxPage ? baseStyle.Disabled : ''}`,
    };

    return paginationStyles;
}