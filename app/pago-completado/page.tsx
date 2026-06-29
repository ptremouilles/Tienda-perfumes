import Link from "next/link"
import Navbar from "../components/Navbar"

export default function PagoCompletado() {
  return (
    <main className="auth-page">
      <Navbar />
      <div className="auth-container" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "2rem", color: "#27ae60", marginBottom: "10px" }}>✓</p>
        <h2>¡Pago completado!</h2>
        <p style={{ color: "#666", margin: "20px 0" }}>
          Tu pago fue procesado exitosamente. Gracias por tu compra en Lumière Parfums.
        </p>
        <Link href="/catalogo" style={{
          display: "inline-block",
          background: "#1a1a2e",
          color: "white",
          padding: "12px 30px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          marginTop: "10px"
        }}>
          Seguir comprando
        </Link>
      </div>
    </main>
  )
}