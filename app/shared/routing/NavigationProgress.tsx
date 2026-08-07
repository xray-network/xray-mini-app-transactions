import { useEffect, useRef } from "react"
import { useLocation, useNavigation } from "react-router"
import NProgress from "nprogress"

export default function NavigationProgress() {
  const navigation = useNavigation()
  const location = useLocation()
  const currentPath = useRef(location.pathname)
  const doneTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (doneTimeout.current) clearTimeout(doneTimeout.current)
    if (location.pathname !== currentPath.current || navigation.state === "loading") NProgress.start()
    if (navigation.state === "idle") {
      doneTimeout.current = setTimeout(() => {
        NProgress.done()
        currentPath.current = location.pathname
      }, 200)
    }
    return () => {
      if (doneTimeout.current) clearTimeout(doneTimeout.current)
    }
  }, [location.pathname, navigation.state])

  return null
}
