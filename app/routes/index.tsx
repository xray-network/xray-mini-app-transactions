import { HappyProvider } from "@ant-design/happy-work-theme"
import Home from "@/components/pages/Home"

export default function HomePage() {
  return (
    <>
      <HappyProvider /> {/* Hotfix: Provides global styles for Ant Design Happy Theme component */}
      <Home />
    </>
  )
}
