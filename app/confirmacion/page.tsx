import Link from "next/link"
import Navbar from "../components/Navbar"

export default function Confirmacion() {
  return (
    <main className="auth-page">
      <Navbar />
      <div className="auth-container" style={{ textAlign: "center" }}>
        <h2>¡Compra realizada con éxito!</h2>
        <p style={{ color: "#666", margin: "20px 0" }}>
          Gracias por tu compra en Lumière Parfums. Tu pedido está siendo procesado.
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