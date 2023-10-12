import { useEffect, useState } from 'react'
import { usePathname } from "next/navigation";

export function RouteChecker() {
    const [currentURL, setCurrentURL] = useState('')

    const URL = usePathname()
    useEffect(() => {
        setCurrentURL(URL)
    }, [URL])
    return currentURL
}