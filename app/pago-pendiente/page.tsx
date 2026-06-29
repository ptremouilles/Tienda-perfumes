import Link from "next/link"
import Navbar from "../components/Navbar"

export default function PagoPendiente() {
  return (
    <main className="auth-page">
      <Navbar />
      <div className="auth-container" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "2rem", color: "#f39c12", marginBottom: "10px" }}>⏳</p>
        <h2>Pago pendiente</h2>
        <p style={{ color: "#666", margin: "20px 0" }}>
          Tu pago está siendo procesado. Te notificaremos cuando se confirme.
        </p>
        <Link href="/" style={{
          display: "inline-block",
          background: "#1a1a2e",
          color: "white",
          padding: "12px 30px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          marginTop: "10px"
        }}>
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}