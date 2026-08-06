import { useEffect, useRef } from "react"
import { useLocation, useNavigation } from "react-router"
import NProgress from "nprogress"
import { miniAppClient } from "@xray-network/mini-app-sdk/client"
import { useHostMessage, useMiniApp } from "@xray-network/mini-app-sdk/react"
import { useAppStore } from "@/store/app"

const Effects = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation()
  const location = useLocation()
  const currLocation = useRef(location.pathname)
  const nprogressDoneTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { connected } = useMiniApp()

  const updateTip = useAppStore((state) => state.updateTip)
  const accountStateSet = useAppStore((state) => state.accountStateSet)
  const networkSet = useAppStore((state) => state.networkSet)
  const currencySet = useAppStore((state) => state.currencySet)
  const hideBalancesSet = useAppStore((state) => state.hideBalancesSet)
  const explorerSet = useAppStore((state) => state.explorerSet)

  useHostMessage("xray.host.tip", (tip) => void updateTip(tip))
  useHostMessage("xray.host.accountState", accountStateSet)
  useHostMessage("xray.host.network", (network) => {
    networkSet(network)
  })
  useHostMessage("xray.host.currency", currencySet)
  useHostMessage("xray.host.hideBalances", hideBalancesSet)
  useHostMessage("xray.host.explorer", explorerSet)

  useEffect(() => {
    if (!connected) return
    void miniAppClient.getTip()
    void miniAppClient.getAccountState()
    void miniAppClient.getNetwork()
    void miniAppClient.getCurrency()
    void miniAppClient.getHideBalances()
    void miniAppClient.getExplorer()
  }, [connected])

  useEffect(() => {
    if (nprogressDoneTimeout.current) clearTimeout(nprogressDoneTimeout.current)
    const isNewRoute = location.pathname !== currLocation.current
    if (isNewRoute || navigation.state === "loading") NProgress.start()
    if (navigation.state === "idle") {
      nprogressDoneTimeout.current = setTimeout(() => {
        NProgress.done()
        currLocation.current = location.pathname
      }, 200)
    }
    return () => {
      if (nprogressDoneTimeout.current) clearTimeout(nprogressDoneTimeout.current)
    }
  }, [location.pathname, navigation.state])

  return children
}

export default Effects
