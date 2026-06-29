"use client"

import { useCarrito } from "./CarritoContext"
import Link from "next/link"

type Props = {
  abierto: boolean
  onCerrar: () => void
}

export default function CarritoLateral({ abierto, onCerrar }: Props) {
  const { carrito, quitarDelCarrito, modificarCantidad, vaciarCarrito, totalItems } = useCarrito()

  const total = carrito.reduce((acc, p) => {
    const precio = parseInt(p.precio?.replace(/[$\.]/g, "") ?? "0")
    return acc + precio * p.cantidad
  }, 0)

  return (
    <>
      {abierto && (
        <div
          onClick={onCerrar}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 200,
          }}
        />
      )}
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "380px",
        background: "#fdf6f0",
        zIndex: 201,
        transform: abierto ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        display: "flex",
        flexDirection: "column",
        boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e8d5c0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.3rem", color: "#1a1a2e" }}>Tu carrito ({totalItems})</h2>
          <button onClick={onCerrar} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#1a1a2e" }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {carrito.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", marginTop: "40px" }}>Tu carrito está vacío</p>
          ) : (
            carrito.map((producto) => (
              <div key={producto.id} style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
                <img src={producto.imagen} alt={producto.nombre} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#1a1a2e", marginBottom: "4px" }}>{producto.nombre}</p>
                  <p style={{ color: "#888", fontSize: "0.85rem" }}>{producto.precio}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                    <button onClick={() => modificarCantidad(producto.id, -1)} style={{ background: "#1a1a2e", color: "white", border: "none", width: "24px", height: "24px", cursor: "pointer", borderRadius: "2px" }}>-</button>
                    <span style={{ fontSize: "0.9rem" }}>{producto.cantidad}</span>
                    <button onClick={() => modificarCantidad(producto.id, 1)} style={{ background: "#1a1a2e", color: "white", border: "none", width: "24px", height: "24px", cursor: "pointer", borderRadius: "2px" }}>+</button>
                  </div>
                </div>
                <button onClick={() => quitarDelCarrito(producto.id)} style={{ background: "none", border: "none", color: "#c0392b", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #e8d5c0" }}>
            <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#1a1a2e", marginBottom: "16px" }}>
              Total: ${total.toLocaleString("es-AR")}
            </p>
            <button
              onClick={vaciarCarrito}
              style={{ display: "block", width: "100%", background: "none", border: "1px solid #1a1a2e", color: "#1a1a2e", padding: "12px", borderRadius: "4px", cursor: "pointer", letterSpacing: "1px", marginBottom: "10px" }}
            >
              Vaciar carrito
            </button>
            <Link
              href="/carrito"
              onClick={onCerrar}
              style={{ display: "block", background: "#1a1a2e", color: "white", padding: "14px", textAlign: "center", textDecoration: "none", borderRadius: "4px", letterSpacing: "1px", fontWeight: "bold" }}
            >
              Ver carrito
            </Link>
          </div>
        )}
      </div>
    </>
  )
}