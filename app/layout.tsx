import type { Metadata } from "next"
import "./globals.css"
import { CarritoProvider } from "./components/CarritoContext"

export const metadata: Metadata = {
  title: "Lumière Parfums",
  description: "Tienda de perfumes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <CarritoProvider>
          {children}
        </CarritoProvider>
      </body>
    </html>
  )
}