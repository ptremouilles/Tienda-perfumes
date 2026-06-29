"use client"

import { useEffect, useRef } from "react"
import Navbar from "../components/Navbar"
import { Leaf, Sparkles, Heart, User } from "lucide-react"

export default function Nosotros() {
  const sectionsRef = useRef<HTMLDivElement>(null)

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

    const sections = sectionsRef.current?.querySelectorAll(".fade-in")
    sections?.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main style={{ minHeight: "100vh", background: "#f5e6d3" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "60px 20px 80px", background: "#1a1a2e", color: "#f5e6d3" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "16px", fontFamily: "Georgia, serif" }}>Nuestra Historia</h1>
        <p style={{ fontSize: "1.2rem", color: "#b8a99a", maxWidth: "600px", margin: "0 auto 30px", lineHeight: "1.8" }}>
          Desde 2010, creando fragancias que despiertan emociones y evocan recuerdos únicos.
        </p>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 20px" }}>
          <img src="/nosotros.png" alt="Taller Lumière Parfums" loading="eager" style={{ width: "100%", borderRadius: "12px 12px 0 0", boxShadow: "0 8px 30px rgba(0,0,0,0.3)", display: "block" }} />
        </div>
      </section>

      <div ref={sectionsRef}>
        {/* Historia */}
        <section className="fade-in" style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 20px 40px" }}>
          <h2 style={{ fontSize: "2rem", color: "#1a1a2e", marginBottom: "30px", fontFamily: "Georgia, serif" }}>Cómo nació Lumière Parfums</h2>
          <div className="historia-grid" style={{ display: "grid", gridTemplateColumns: "1fr 550px", gap: "50px", alignItems: "center" }}>
            <div style={{ textAlign: "left" }}>
              <p style={{ color: "#555", lineHeight: "1.9", fontSize: "1.05rem", marginBottom: "20px" }}>
                Todo comenzó en un pequeño taller en el barrio de Palermo, Buenos Aires. Marie Dubois, una joven química francesa que llegó a Argentina enamorada del país, descubrió que los aromas locales — el jazmín de los patios porteños, la madera del delta del Tigre, la vainilla del norte — tenían una personalidad única que no se encontraba en ninguna fragancia del mercado.
              </p>
              <p style={{ color: "#555", lineHeight: "1.9", fontSize: "1.05rem", marginBottom: "20px" }}>
                En 2010, con una mesa de trabajo, frascos de vidrio y una pasión desbordante, Marie creó las primeras tres fragancias de Lumière Parfums. La respuesta del barrio fue inmediata: en pocas semanas, los perfumes de Marie pasaron de regalo entre amigos a los estantes de las primeras boutiques porteñas.
              </p>
              <p style={{ color: "#555", lineHeight: "1.9", fontSize: "1.05rem" }}>
                Hoy, más de una década después, Lumière Parfums es una marca reconocida en toda América Latina. Mantenemos la misma filosofía del origen: ingredientes naturales, fórmulas artesanales y una historia detrás de cada frasco.
              </p>
            </div>
            <div style={{ marginTop: "-30px" }}>
              <img src="/nosotros2.png" alt="Taller original de Lumière Parfums en Palermo" style={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="fade-in" style={{ background: "#fdf6f0", padding: "60px 20px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2rem", color: "#1a1a2e", marginBottom: "40px", textAlign: "center", fontFamily: "Georgia, serif" }}>Nuestros valores</h2>
            <div className="valores-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
              <div style={{ textAlign: "center", padding: "30px 20px" }}>
                <Leaf size={40} color="#1a1a2e" style={{ margin: "0 auto 12px" }} />
                <h3 style={{ color: "#1a1a2e", marginBottom: "10px" }}>Natural</h3>
                <p style={{ color: "#666", lineHeight: "1.7" }}>Usamos ingredientes 100% naturales, seleccionados con cuidado de productores locales y sostenibles.</p>
              </div>
              <div style={{ textAlign: "center", padding: "30px 20px" }}>
                <Sparkles size={40} color="#1a1a2e" style={{ margin: "0 auto 12px" }} />
                <h3 style={{ color: "#1a1a2e", marginBottom: "10px" }}>Artesanal</h3>
                <p style={{ color: "#666", lineHeight: "1.7" }}>Cada fragancia se elabora a mano en pequeños lotes, garantizando la más alta calidad en cada frasco.</p>
              </div>
              <div style={{ textAlign: "center", padding: "30px 20px" }}>
                <Heart size={40} color="#1a1a2e" style={{ margin: "0 auto 12px" }} />
                <h3 style={{ color: "#1a1a2e", marginBottom: "10px" }}>Pasión</h3>
                <p style={{ color: "#666", lineHeight: "1.7" }}>Cada perfume nace de una historia real, una emoción genuina y el deseo de crear algo que perdure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className="fade-in" style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px" }}>
          <h2 style={{ fontSize: "2rem", color: "#1a1a2e", marginBottom: "40px", textAlign: "center", fontFamily: "Georgia, serif" }}>El equipo</h2>
          <div className="equipo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "#1a1a2e", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={40} color="#f5e6d3" />
              </div>
              <h3 style={{ color: "#1a1a2e", marginBottom: "6px" }}>Marie Dubois</h3>
              <p style={{ color: "#888", fontSize: "0.9rem" }}>Fundadora & Perfumista</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "#1a1a2e", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={40} color="#f5e6d3" />
              </div>
              <h3 style={{ color: "#1a1a2e", marginBottom: "6px" }}>Martín Reyes</h3>
              <p style={{ color: "#888", fontSize: "0.9rem" }}>Director Creativo</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "#1a1a2e", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={40} color="#f5e6d3" />
              </div>
              <h3 style={{ color: "#1a1a2e", marginBottom: "6px" }}>Sofía Larrea</h3>
              <p style={{ color: "#888", fontSize: "0.9rem" }}>Directora de Arte</p>
            </div>
          </div>
        </section>
      </div>

    </main>
  )
}