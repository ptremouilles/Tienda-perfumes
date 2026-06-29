export default function Footer() {
    return (
      <footer style={{ background: "#1a1a2e", color: "#f5e6d3", padding: "60px 40px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "40px", marginBottom: "40px" }}>
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "12px", color: "#f5e6d3" }}>Lumière Parfums</h3>
            <p style={{ color: "#b8a99a", lineHeight: "1.7" }}>Fragancias únicas para momentos inolvidables. Cada perfume cuenta una historia.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "16px", letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" as const }}>Navegación</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}><a href="/" style={{ color: "#b8a99a", textDecoration: "none" }}>Inicio</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/catalogo" style={{ color: "#b8a99a", textDecoration: "none" }}>Catálogo</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/nosotros" style={{ color: "#b8a99a", textDecoration: "none" }}>Nosotros</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/#contacto" style={{ color: "#b8a99a", textDecoration: "none" }}>Contacto</a></li>
              <li style={{ marginBottom: "10px" }}><a href="/login" style={{ color: "#b8a99a", textDecoration: "none" }}>Mi cuenta</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: "16px", letterSpacing: "1px", fontSize: "0.9rem", textTransform: "uppercase" as const }}>Contacto</h4>
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
    )
  }