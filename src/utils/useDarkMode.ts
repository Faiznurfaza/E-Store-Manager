import { useEffect, useState } from "react";
import { useTheme } from 'next-themes'

export function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { theme, setTheme } = useTheme();

    const toggleDarkMode = () => {
        // Toggle the theme between "light" and "dark"
        setTheme(theme === "light" ? "dark" : "light");
    }

    // Use the theme from 'next-theme' to determine if it's dark mode
    useEffect(() => {
        setIsDarkMode(theme === "dark");
    }, [theme]);

    return { isDarkMode, toggleDarkMode };
}