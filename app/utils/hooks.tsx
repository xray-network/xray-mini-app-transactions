import { useState, useEffect } from "react"

export const useIsMobileView = (breakpoint: number = 1023): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mediaQuery.matches)
    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [breakpoint])
  return isMobile
}
