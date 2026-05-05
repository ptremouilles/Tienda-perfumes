"use client"

import { useCarrito } from "./CarritoContext"
import Link from "next/link"

export default function Navbar() {
  const { totalItems } = useCarrito()

  return (
    <header>
      <nav>
        <h1>Lumière Parfums</h1>
        <ul>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/catalogo">Catálogo</Link></li>
          <li><a href="#">Nosotros</a></li>
          <li><Link href="/#contacto">Contacto</Link></li>
        </ul>
        <Link href="/carrito">
          <p>🛒 {totalItems}</p>
        </Link>
      </nav>
    </header>
  )
}