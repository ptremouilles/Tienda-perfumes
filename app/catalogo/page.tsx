"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { useCarrito } from "../components/CarritoContext"
import Navbar from "../components/Navbar"

const productos = [
  { id: 1, nombre: "Nuit Dorée", descripcion: "Una fragancia cálida con notas de vainilla y ámbar.", precio: "$125.000", imagen: "/nuit-doree.png" },
  { id: 2, nombre: "Rosé Éternel", descripcion: "Floral y fresco, ideal para el día a día.", precio: "$98.000", imagen: "/rose-eternel.png" },
  { id: 3, nombre: "Bois Mystère", descripcion: "Amaderado e intenso para las noches especiales.", precio: "$145.000", imagen: "/bois-mystere.png" },
  { id: 4, nombre: "Brume Marine", descripcion: "Fresco y limpio, con notas de sal y cítricos.", precio: "$110.000", imagen: "/brume-marine.png" },
  { id: 5, nombre: "Velours Noir", descripcion: "Intenso y seductor, con notas de musk y madera oscura.", precio: "$165.000", imagen: "/velours-noir.png" },
  { id: 6, nombre: "Jardin Secret", descripcion: "Floral y dulce, con notas de peonía y fresia.", precio: "$92.000", imagen: "/jardin-secret.png" }
]

export default function Catalogo() {
  const [cargando, setCargando] = useState(true)
  const { agregarAlCarrito } = useCarrito()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then(() => {
        setCargando(false)
      })
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
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagen={producto.imagen}
            onAgregar={() => agregarAlCarrito({ id: producto.id, nombre: producto.nombre, precio: producto.precio, imagen: producto.imagen })}
        />
        </li>
    ))}
    </ul>
</main>
  )
}