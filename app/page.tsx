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

      <section style={{ padding: "60px 40px", background: "#1a1a2e", color: "#f5e6d3", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "16px", fontFamily: "Georgia, serif" }}>Nuestra historia</h2>
        <p style={{ fontSize: "1.1rem", color: "#b8a99a", maxWidth: "600px", margin: "0 auto 30px", lineHeight: "1.8" }}>
          Desde 2010 creamos fragancias artesanales en Palermo, Buenos Aires. Cada perfume nace de una historia real y de ingredientes naturales seleccionados con cuidado.
        </p>
        <a href="/nosotros" style={{ background: "#f5e6d3", color: "#1a1a2e", padding: "12px 30px", textDecoration: "none", borderRadius: "2px", letterSpacing: "1px", fontWeight: "bold" }}>Conocenos</a>
      </section>

      <section style={{ padding: "60px 40px", background: "#fdf6f0" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "40px" }}>Lo que dicen nuestros clientes</h2>
        <div style={{ display: "flex", gap: "30px", justifyContent: "center", flexWrap: "wrap" }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", maxWidth: "300px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            <p style={{ color: "#f5a623", fontSize: "1.2rem", marginBottom: "10px" }}>★★★★★</p>
            <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "16px", fontStyle: "italic" }}>"Nuit Dorée es simplemente perfecta. La uso todos los días y recibo cumplidos constantemente. Una fragancia elegante y duradera."</p>
            <p style={{ fontWeight: "bold", color: "#1a1a2e" }}>— Valentina R.</p>
          </div>
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", maxWidth: "300px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            <p style={{ color: "#f5a623", fontSize: "1.2rem", marginBottom: "10px" }}>★★★★★</p>
            <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "16px", fontStyle: "italic" }}>"Compré Rosé Éternel como regalo y mi mamá quedó encantada. El packaging es hermoso y el aroma es suave y floral. ¡Lo recomiendo!"</p>
            <p style={{ fontWeight: "bold", color: "#1a1a2e" }}>— Camila T.</p>
          </div>
          <div style={{ background: "white", padding: "30px", borderRadius: "12px", maxWidth: "300px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
            <p style={{ color: "#f5a623", fontSize: "1.2rem", marginBottom: "10px" }}>★★★★☆</p>
            <p style={{ color: "#555", lineHeight: "1.7", marginBottom: "16px", fontStyle: "italic" }}>"Bois Mystère tiene una personalidad única. Es intenso pero sofisticado, ideal para las noches. Llegó rápido y muy bien empacado."</p>
            <p style={{ fontWeight: "bold", color: "#1a1a2e" }}>— Martín L.</p>
          </div>
        </div>
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
    </main>
  )
}