"use client"

import { useCarrito } from "../components/CarritoContext"
import Navbar from "../components/Navbar"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Carrito() {
  const { carrito, quitarDelCarrito, modificarCantidad, vaciarCarrito } = useCarrito()
  const [verificando, setVerificando] = useState(true)
  const [procesando, setProcesando] = useState(false)
  const [usuario, setUsuario] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login")
      } else {
        setUsuario(session.user)
        setVerificando(false)
      }
    })
  }, [])


  const handleFinalizarCompra = async () => {
    if (carrito.length === 0) return
    setProcesando(true)
  
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: carrito,
        total,
        userEmail: usuario.email
      })
    })
  
    const data = await response.json()
  
    if (data.success) {
      vaciarCarrito()
      router.push("/confirmacion")
    } else {
      alert("Error al procesar la compra. Intentá de nuevo.")
    }
  
    setProcesando(false)
  }

  const total = carrito.length > 0 ? carrito.reduce((acc, p) => {
    const precio = parseInt(p.precio?.replace(/[$\.]/g, "") ?? "0")
    return acc + precio * p.cantidad
  }, 0) : 0

  if (verificando) {
    return <main><Navbar /><p style={{ textAlign: "center", marginTop: "100px" }}>Verificando sesión...</p></main>
  }

  return (
    <main>
      <Navbar />
      <div style={{ maxWidth: "700px", margin: "60px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>Tu carrito</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío. <Link href="/">Volver a la tienda</Link></p>
        ) : (
          <>
            <ul style={{ listStyle: "none" }}>
              {carrito.map((producto) => (
                <li key={producto.id} style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px", background: "#fdf6f0", padding: "20px", borderRadius: "4px" }}>
                  <img src={producto.imagen} alt={producto.nombre} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: "5px" }}>{producto.nombre}</h3>
                    <p style={{ color: "#666" }}>{producto.precio}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button onClick={() => modificarCantidad(producto.id, -1)} style={{ background: "#1a1a2e", color: "white", border: "none", width: "30px", height: "30px", cursor: "pointer", borderRadius: "2px", fontSize: "1.2rem" }}>-</button>
                    <span>{producto.cantidad}</span>
                    <button onClick={() => modificarCantidad(producto.id, 1)} style={{ background: "#1a1a2e", color: "white", border: "none", width: "30px", height: "30px", cursor: "pointer", borderRadius: "2px", fontSize: "1.2rem" }}>+</button>
                  </div>
                  <button onClick={() => quitarDelCarrito(producto.id)} style={{ background: "#c0392b", color: "white", border: "none", padding: "8px 16px", cursor: "pointer", borderRadius: "2px" }}>
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <p style={{ textAlign: "right", fontSize: "1.2rem", fontWeight: "bold", marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
              Total: ${total.toLocaleString()}
            </p>
            <div style={{ display: "flex", gap: "15px", marginTop: "20px", justifyContent: "flex-end" }}>
              <button onClick={vaciarCarrito} style={{ background: "#1a1a2e", color: "white", border: "none", padding: "12px 30px", cursor: "pointer", borderRadius: "2px", letterSpacing: "1px" }}>
                Vaciar carrito
              </button>
              <button 
                onClick={handleFinalizarCompra}
                disabled={procesando}
                style={{ background: "#1a1a2e", color: "white", border: "none", padding: "12px 30px", cursor: "pointer", borderRadius: "2px", letterSpacing: "1px" }}>
                {procesando ? "Procesando..." : "Finalizar compra"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}