"use client"

import { useState, useEffect, useRef } from "react"
import ProductCard from "../components/ProductCard"
import { useCarrito } from "../components/CarritoContext"
import Navbar from "../components/Navbar"
import { supabase } from "../lib/supabase"

type Producto = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock: number
}

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargando, setCargando] = useState(true)
  const { agregarAlCarrito } = useCarrito()
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")

      if (error) {
        console.error("Error cargando productos:", error)
      } else {
        setProductos(data || [])
      }
      setCargando(false)
    }

    fetchProductos()
  }, [])

  useEffect(() => {
    if (cargando || !listRef.current) return

    const items = listRef.current.querySelectorAll("li")
    items.forEach((item, index) => {
      (item as HTMLElement).style.opacity = "0"
      ;(item as HTMLElement).style.transform = "translateY(30px)"
      ;(item as HTMLElement).style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
      
      setTimeout(() => {
        (item as HTMLElement).style.opacity = "1"
        ;(item as HTMLElement).style.transform = "translateY(0)"
      }, 50)
    })
  }, [cargando])

  if (cargando) {
    return <main className="catalogo"><Navbar /><p>Cargando productos...</p></main>
  }

  return (
    <main className="catalogo">
      <Navbar />
      <h2>Catálogo completo</h2>
      <ul ref={listRef}>
        {productos.map((producto) => (
          <li key={producto.id}>
            <ProductCard
              nombre={producto.name}
              descripcion={producto.description}
              precio={`$${producto.price.toLocaleString("es-AR")}`}
              imagen={producto.image_url}
              onAgregar={() => agregarAlCarrito({
                id: producto.id,
                nombre: producto.name,
                precio: `$${producto.price.toLocaleString("es-AR")}`,
                imagen: producto.image_url
              })}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}