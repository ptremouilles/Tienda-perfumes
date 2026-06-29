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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.05 }
    )

    const items = listRef.current.querySelectorAll("li")
    items.forEach((item, index) => {
      (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`
      item.classList.add("fade-in")
      observer.observe(item)
    })

    return () => observer.disconnect()
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