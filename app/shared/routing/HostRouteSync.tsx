import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { client } from "@xray-network/xray-js/mini-app-bridge"
import { useHostMessage, useMiniApp } from "@xray-network/xray-js/mini-app-bridge/react"

export default function HostRouteSync() {
  const { connected } = useMiniApp()
  const navigate = useNavigate()
  const location = useLocation()
  const route = location.pathname + location.search + location.hash

  useEffect(() => {
    if (connected) void client.platform.routeChanged(route)
  }, [connected, route])

  useHostMessage("xray.host.routeChanged", (newRoute) => {
    if (newRoute !== route) void navigate(newRoute)
  })

  return null
}
