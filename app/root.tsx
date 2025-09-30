import "@/styles/tailwind.css"
import "nprogress/nprogress.css"
import "@/styles/style.css"

import "@ant-design/v5-patch-for-react-19"
import type { Route } from "./+types/root"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import Effects from "@/effects"
import Theme from "@/theme"

export const links: Route.LinksFunction = () => [
  { rel: "manifest", href: "/manifest.webmanifest", crossOrigin: "anonymous" },
  {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png",
    sizes: "512x512",
  },
  {
    rel: "preload",
    href: "https://cdn.xray.app/fonts/satoshi/Satoshi-Medium.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "https://cdn.xray.app/fonts/satoshi/Satoshi-Bold.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "https://cdn.xray.app/fonts/satoshi/Satoshi-Black.ttf",
    as: "font",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.xray.app/fonts/satoshi.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.xray.app/fonts/archivo.css",
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-sans antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,viewport-fit=cover,initial-scale=1,shrink-to-fit=no,maximum-scale=1,user-scalable=0"
        />
        <meta name="theme-color" content="#000000" />
        <title>XRAY/Transactions</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function HydrateFallback() {
  return (
    <div
      style={{
        width: "100%vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
      }}
    >
      <svg
        width="59px"
        height="37px"
        viewBox="0 0 59 37"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" strokeWidth="1" fill="#ffffff" fillRule="evenodd">
          <path
            d="M27.2644887,12.845956 L40.286334,0 L57.8748681,0 L34.5892767,22.6565806 L31.6051038,23.7948299 L18.2215405,36.966 L0.135644222,36.966 L23.5116652,14.6888358 L27.2644887,12.845956 Z M0,0 L18.31197,0 L31.0625269,12.7375513 L34.9509946,14.7430381 L57.9652976,36.966 L39.4724687,36.966 L25.9984759,23.4696158 L22.0647935,21.4099267 L0,0 Z"
            fillRule="nonzero"
          />
        </g>
      </svg>
    </div>
  )
}

export default function App() {
  return (
    <Effects>
      <Theme>
        <Outlet />
      </Theme>
    </Effects>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
