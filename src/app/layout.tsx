import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Provider } from "@/components/provider"
import { Background } from "@/components/widgets/background"
import { getOrigin } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  title: "Botond Fekete",
  description: "Botond Fekete's personal website",
  metadataBase: getOrigin(),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="print:light" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/icons/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Sixtyfour&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@2.16.0/devicon.min.css"
        />
      </head>
      <body className="font-mono">
        <Provider>
          {children}
          <Background />
        </Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
