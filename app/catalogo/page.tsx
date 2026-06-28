"use client"

import { useState, useEffect } from "react"
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

  if (cargando) {
    return <main className="catalogo"><p>Cargando productos...</p></main>
  }

  return (
    <main className="catalogo">
      <Navbar />
      <h2>Catálogo completo</h2>
      <ul>
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