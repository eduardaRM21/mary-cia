import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AÇAÍ DA MARY E CIA - Nova Carapina | Açaí Fresquinho e Saboroso",
  description:
    "O melhor açaí de Nova Carapina! AÇAÍ DA MARY E CIA oferece açaí fresquinho com ingredientes selecionados. Peça pelo WhatsApp (27) 98864-6488",
  keywords: "açaí Nova Carapina, açaí Serra ES, açaí delivery, AÇAÍ DA MARY E CIA",
  authors: [{ name: "AÇAÍ DA MARY E CIA" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "AÇAÍ DA MARY E CIA - Nova Carapina",
    description: "O melhor açaí de Nova Carapina com ingredientes selecionados",
    type: "website",
    locale: "pt_BR",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>🍇</text></svg>"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
