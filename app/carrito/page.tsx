"use client"

import { useCarrito } from "../components/CarritoContext"
import Navbar from "../components/Navbar"
import Link from "next/link"

export default function Carrito() {
  const { carrito, quitarDelCarrito, modificarCantidad, vaciarCarrito } = useCarrito()

  const total = carrito.length > 0 ? carrito.reduce((acc, p) => {
    const precio = parseInt(p.precio?.replace(/[$\.]/g, "") ?? "0")
    return acc + precio * p.cantidad
  }, 0) : 0

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
              <button style={{ background: "#1a1a2e", color: "white", border: "none", padding: "12px 30px", cursor: "pointer", borderRadius: "2px", letterSpacing: "1px" }}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}