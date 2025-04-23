import type { Metadata } from "next"
import type React from "react"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Neo | Assistente de IA",
  description: "Automatize seu atendimento via WhatsApp com um assistente inteligente.",
  keywords: ["IA", "WhatsApp", "Atendimento", "Suporte ao Cliente" , "Agendamentos"],
  authors: [{ name: "Neo" }],
  openGraph: {
    title: "Assistente de IA para WhatsApp",
    description: "Automatize seu atendimento via WhatsApp com um assistente inteligente.",
  },
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
