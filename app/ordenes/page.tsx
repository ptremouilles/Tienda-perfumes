"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push("/login")
        return
      }
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*, products(name, image_url))")
        .eq("user_email", session.user.email)
        .order("created_at", { ascending: false })

      setOrdenes(data || [])
      setCargando(false)
    })
  }, [])

  if (cargando) {
    return <main><Navbar /><p style={{ textAlign: "center", marginTop: "100px" }}>Cargando...</p></main>
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f5e6d3" }}>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "2rem", color: "#1a1a2e", marginBottom: "40px", fontFamily: "Georgia, serif" }}>Mis órdenes</h2>

        {ordenes.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", marginTop: "60px" }}>Todavía no realizaste ninguna compra.</p>
        ) : (
          ordenes.map((orden) => (
            <div key={orden.id} style={{ background: "#fdf6f0", borderRadius: "12px", padding: "24px", marginBottom: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <p style={{ fontSize: "0.85rem", color: "#888" }}>Orden #{orden.id.slice(0, 8).toUpperCase()}</p>
                  <p style={{ fontSize: "0.85rem", color: "#888" }}>{new Date(orden.created_at).toLocaleDateString("es-AR")}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ background: orden.status === "pending" ? "#f39c12" : "#27ae60", color: "white", padding: "4px 12px", borderRadius: "12px", fontSize: "0.85rem" }}>
                    {orden.status === "pending" ? "Pendiente" : "Pagado"}
                  </span>
                  <p style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#1a1a2e", marginTop: "6px" }}>
                    ${orden.total.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
              <div style={{ borderTop: "1px solid #e8d5c0", paddingTop: "16px" }}>
                {orden.order_items?.map((item: any) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                    <img src={item.products?.image_url} alt={item.products?.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                    <div>
                      <p style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#1a1a2e" }}>{item.products?.name}</p>
                      <p style={{ fontSize: "0.85rem", color: "#888" }}>Cantidad: {item.quantity} — ${item.unit_price.toLocaleString("es-AR")} c/u</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}