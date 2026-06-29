"use client"

import { useState, useEffect, useRef } from "react"
import ProductCard from "./components/ProductCard"
import Navbar from "./components/Navbar"
import { useCarrito } from "./components/CarritoContext"

export default function Home() {
  const { agregarAlCarrito } = useCarrito()
  const [error, setError] = useState("")
  const [exito, setExito] = useState(false)

  
  const productsRef = useRef<HTMLUListElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    },
    { threshold: 0.1 }
  )

  const items = productsRef.current?.querySelectorAll("li")
  items?.forEach((item, index) => {
    (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`
    item.classList.add("fade-in")
    observer.observe(item)
  })

  return () => observer.disconnect()
}, [])

  return (
    <main>
      <Navbar />
  
      <section className="hero-section" style={{ backgroundImage: "url('/hero.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      </section>
  
      <section>
        <h2>Descubrí tu fragancia ideal</h2>
        <p>Perfumes únicos para momentos inolvidables.</p>
        <a href="/catalogo">Ver catálogo</a>
      </section>

      <section>
        <h2>Nuestros productos destacados</h2>
        <ul ref={productsRef}>
        <li>
    <ProductCard
      nombre="Nuit Dorée"
      descripcion="Una fragancia cálida con notas de vainilla y ámbar."
      precio="$125.000"
      imagen="/nuit-doree.png"
      onAgregar={() => agregarAlCarrito({ id: "a31a9a82-c878-48b2-b40f-692083e745b0", nombre: "Nuit Dorée", precio: "$125.000", imagen: "/nuit-doree.png" })}
    />
  </li>
  <li>
    <ProductCard
      nombre="Rosé Éternel"
      descripcion="Floral y fresco, ideal para el día a día."
      precio="$98.000"
      imagen="/rose-eternel.png"
      onAgregar={() => agregarAlCarrito({ id: "a113bd4d-147b-41d1-9e44-751aa2a6deb7", nombre: "Rosé Éternel", precio: "$98.000", imagen: "/rose-eternel.png" })}
    />
  </li>
  <li>
    <ProductCard
      nombre="Bois Mystère"
      descripcion="Amaderado e intenso para las noches especiales."
      precio="$145.000"
      imagen="/bois-mystere.png"
      onAgregar={() => agregarAlCarrito({ id: "d93d5f2a-c5dc-45a4-b1c1-d1ad8ec09ca2", nombre: "Bois Mystère", precio: "$145.000", imagen: "/bois-mystere.png" })}
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

      <footer style={{ background: "#1a1a2e", color: "#f5e6d3", padding: "60px 40px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>
          
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "12px", color: "#f5e6d3" }}>Lumière Parfums</h3>
            <p style={{ color: "#b8a99a", lineHeight: "1.7" }}>Fragancias únicas para momentos inolvidables. Cada perfume cuenta una historia.</p>
          </div>

          <div>
            <h4 style={{ marginBottom: "16px", letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" }}>Navegación</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}><a href="/" style={{ color: "#b8a99a", textDecoration: "none" }}>Inicio</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/catalogo" style={{ color: "#b8a99a", textDecoration: "none" }}>Catálogo</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/#contacto" style={{ color: "#b8a99a", textDecoration: "none" }}>Contacto</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/login" style={{ color: "#b8a99a", textDecoration: "none" }}>Mi cuenta</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: "16px", letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" }}>Contacto</h4>
            <ul style={{ listStyle: "none", padding: 0, color: "#b8a99a" }}>
              <li style={{ marginBottom: "10px" }}>lumiereParfums@gmail.com</li>
              <li style={{ marginBottom: "10px" }}>+54 11 4823-9165</li>
              <li style={{ marginBottom: "10px" }}>Av. Alvear 1234, CABA</li>
              <li style={{ marginBottom: "10px" }}>Buenos Aires, Argentina</li>
            </ul>
          </div>

        </div>
        <div style={{ borderTop: "1px solid #2e2e4e", paddingTop: "20px", textAlign: "center", color: "#b8a99a", fontSize: "0.85rem" }}>
          © 2026 Lumière Parfums. Todos los derechos reservados.
        </div>
      </footer>
    </main>
  )
}