"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

export default function Admin() {
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [vista, setVista] = useState<"ordenes" | "productos">("ordenes")
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login")
      } else {
        fetchData()
      }
    })
  }, [])

  const fetchData = async () => {
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })

    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("name")

    setOrders(ordersData || [])
    setProducts(productsData || [])
    setCargando(false)
  }

  if (cargando) {
    return <main><Navbar /><p style={{ textAlign: "center", marginTop: "100px" }}>Cargando...</p></main>
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f5e6d3" }}>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <h2 style={{ fontSize: "2rem", color: "#1a1a2e", marginBottom: "30px" }}>Panel de Administración</h2>

        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <button
            onClick={() => setVista("ordenes")}
            style={{ padding: "10px 24px", background: vista === "ordenes" ? "#1a1a2e" : "#fdf6f0", color: vista === "ordenes" ? "white" : "#1a1a2e", border: "1px solid #1a1a2e", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
            Órdenes ({orders.length})
          </button>
          <button
            onClick={() => setVista("productos")}
            style={{ padding: "10px 24px", background: vista === "productos" ? "#1a1a2e" : "#fdf6f0", color: vista === "productos" ? "white" : "#1a1a2e", border: "1px solid #1a1a2e", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
            Productos ({products.length})
          </button>
        </div>

        {vista === "ordenes" && (
          <div>
            <h3 style={{ marginBottom: "20px", color: "#1a1a2e" }}>Órdenes recientes</h3>
            {orders.length === 0 ? (
              <p>No hay órdenes todavía.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse", background: "#fdf6f0", borderRadius: "8px", overflow: "hidden" }}>
                <thead>
                  <tr style={{ background: "#1a1a2e", color: "white" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Total</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Estado</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: "1px solid #e8d5c0" }}>
                      <td style={{ padding: "12px" }}>{order.user_email}</td>
                      <td style={{ padding: "12px" }}>${order.total.toLocaleString("es-AR")}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ background: order.status === "pending" ? "#f39c12" : "#27ae60", color: "white", padding: "4px 10px", borderRadius: "12px", fontSize: "0.85rem" }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px" }}>{new Date(order.created_at).toLocaleDateString("es-AR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {vista === "productos" && (
          <div>
            <h3 style={{ marginBottom: "20px", color: "#1a1a2e" }}>Productos</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fdf6f0", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#1a1a2e", color: "white" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Nombre</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Precio</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #e8d5c0" }}>
                    <td style={{ padding: "12px" }}>{product.name}</td>
                    <td style={{ padding: "12px" }}>${product.price.toLocaleString("es-AR")}</td>
                    <td style={{ padding: "12px" }}>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}