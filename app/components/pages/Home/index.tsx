import { useAppStore } from "@/store/app"
import style from "./style.module.css"

export default function HomePage() {
  const network = useAppStore((state) => state.network)

  return (
    <div className="text-sm text-gray-500">
      <p>Mini App Name: <strong>XRAY/Transactions</strong></p>
      <p>Mini Apps SDK: not connected, SDK Version: v0.0.0</p>
      <p>CW3JS Network: {network || ""}</p>
    </div>
  )
}
