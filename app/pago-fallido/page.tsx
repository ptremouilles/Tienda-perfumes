import Link from "next/link"
import Navbar from "../components/Navbar"

export default function PagoFallido() {
  return (
    <main className="auth-page">
      <Navbar />
      <div className="auth-container" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "2rem", color: "#c0392b", marginBottom: "10px" }}>✗</p>
        <h2>Pago fallido</h2>
        <p style={{ color: "#666", margin: "20px 0" }}>
          Hubo un problema con tu pago. Podés intentarlo de nuevo.
        </p>
        <Link href="/carrito" style={{
          display: "inline-block",
          background: "#1a1a2e",
          color: "white",
          padding: "12px 30px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          marginTop: "10px"
        }}>
          Volver al carrito
        </Link>
      </div>
    </main>
  )
}