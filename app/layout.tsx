import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Tamish Mhatre - Professional Excuse-Maker",
  description: "Just another dropout with a WiFi connection",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Comic+Neue:wght@700&family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'