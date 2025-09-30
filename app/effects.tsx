import { useEffect, useRef } from "react"
import { useAppStore } from "@/store/app"
import { useWeb3Store } from "@/store/web3"
import { useNavigation, useLocation } from "react-router"
import NProgress from "nprogress"

const Effects = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation()
  const location = useLocation()

  const currLocation = useRef(location.pathname)
  const nprogressDoneTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const interval10 = useRef<ReturnType<typeof setInterval> | null>(null)
  const interval30 = useRef<ReturnType<typeof setInterval> | null>(null)
  const interval600 = useRef<ReturnType<typeof setInterval> | null>(null)

  const web3 = useWeb3Store((state) => state.web3)
  const initWeb3 = useWeb3Store((state) => state.initWeb3)

  const network = useAppStore((state) => state.network)
  const initTheme = useAppStore((state) => state.initTheme)

  // Handle navigation state changes for NProgress
  useEffect(() => {
    const clearTimeouts = () => {
      if (nprogressDoneTimeout.current) clearTimeout(nprogressDoneTimeout.current)
    }
    clearTimeouts()
    const isNewRoute = location.pathname !== currLocation.current
    const isLoading = navigation.state === "loading"
    if (isNewRoute || isLoading) {
      NProgress.start()
    }
    if (navigation.state === "idle") {
      nprogressDoneTimeout.current = setTimeout(() => {
        NProgress.done()
        currLocation.current = location.pathname
      }, 200)
    }
  }, [location.pathname, navigation.state])

  // Initialize theme on first render
  useEffect(() => {
    initTheme()
  }, [])

  // Initialize CardanoWeb3js
  useEffect(() => {
    if (network) {
      initWeb3(network)
    }
  }, [network])

  // Update intervals
  useEffect(() => {
    if (web3) {
      interval10.current = setInterval(() => {
        // Update do something every 10 seconds
      }, 10_000)
    }

    return () => {
      if (interval10.current) clearInterval(interval10.current)
      if (interval30.current) clearInterval(interval30.current)
      if (interval600.current) clearInterval(interval600.current)
    }
  }, [web3])

  return children
}

export default Effects
