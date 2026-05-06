"use client"

import { useState } from "react"
import ProductCard from "./components/ProductCard"
import Navbar from "./components/Navbar"
import { useCarrito } from "./components/CarritoContext"

export default function Home() {
  const { agregarAlCarrito } = useCarrito()
  const [error, setError] = useState("")
  const [exito, setExito] = useState(false)

  

  return (
    <main>
      <Navbar />
  
      <section>
      </section>
  
      <section>
        <h2>Descubrí tu fragancia ideal</h2>
        <p>Perfumes únicos para momentos inolvidables.</p>
        <a href="/catalogo">Ver catálogo</a>
      </section>

      <section>
        <h2>Nuestros productos destacados</h2>
        <ul>
        <li>
    <ProductCard
      nombre="Nuit Dorée"
      descripcion="Una fragancia cálida con notas de vainilla y ámbar."
      precio="$125.000"
      imagen="/nuit-doree.png"
      onAgregar={() => agregarAlCarrito({ id: 1, nombre: "Nuit Dorée", precio: "$125.000", imagen: "/nuit-doree.png" })}
    />
  </li>
  <li>
    <ProductCard
      nombre="Rosé Éternel"
      descripcion="Floral y fresco, ideal para el día a día."
      precio="$98.000"
      imagen="/rose-eternel.png"
      onAgregar={() => agregarAlCarrito({ id: 2, nombre: "Rosé Éternel", precio: "$98.000", imagen: "/rose-eternel.png" })}
    />
  </li>
  <li>
    <ProductCard
      nombre="Bois Mystère"
      descripcion="Amaderado e intenso para las noches especiales."
      precio="$145.000"
      imagen="/bois-mystere.png"
      onAgregar={() => agregarAlCarrito({ id: 3, nombre: "Bois Mystère", precio: "$145.000", imagen: "/bois-mystere.png" })}
    />
  </li>
        </ul>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          const nombre = (e.currentTarget.elements.namedItem("nombre") as HTMLInputElement).value
          const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value
          const mensaje = (e.currentTarget.elements.namedItem("mensaje") as HTMLTextAreaElement).value

          if (!nombre || !email || !mensaje) {
            setError("Por favor completá todos los campos.")
            setExito(false)
            return
          }

          if (!email.includes("@")) {
            setError("El email no es válido.")
            setExito(false)
            return
          }

          setError("")
          setExito(true)
        }}>
          <input type="text" name="nombre" placeholder="Tu nombre" />
          <input type="email" name="email" placeholder="Tu email" />
          <textarea name="mensaje" placeholder="Tu mensaje"></textarea>
          {error && <p style={{color: "red"}}>{error}</p>}
          {exito && <p style={{color: "green"}}>¡Mensaje enviado!</p>}
          <button type="submit">Enviar</button>
        </form>
      </section>

      <footer>
        <p>© 2026 Lumière Parfums. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}