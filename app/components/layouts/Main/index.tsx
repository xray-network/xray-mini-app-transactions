import { Outlet } from "react-router"

export default function LayoutMain() {
  return (
    <div className="p-6 mx-auto max-w-400">
      <Outlet />
    </div>
  )
}
