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
  const [editando, setEditando] = useState<any>(null)
  const [nuevoProducto, setNuevoProducto] = useState(false)
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "", image_url: "" })
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        router.push("/login")
        return
      }
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      if (!roleData || roleData.role !== "admin") {
        router.push("/")
        return
      }
      fetchData()
    })
  }, [])

  const fetchData = async () => {
    const { data: ordersData } = await supabase.from("orders").select("*").order("created_at", { ascending: false })
    const { data: productsData } = await supabase.from("products").select("*").order("name")
    setOrders(ordersData || [])
    setProducts(productsData || [])
    setCargando(false)
  }

  const handleGuardar = async () => {
    if (editando) {
      await supabase.from("products").update({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        image_url: form.image_url,
      }).eq("id", editando.id)
    } else {
      await supabase.from("products").insert({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        image_url: form.image_url,
      })
    }
    setEditando(null)
    setNuevoProducto(false)
    setForm({ name: "", description: "", price: "", stock: "", image_url: "" })
    fetchData()
  }

  const handleEliminar = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await supabase.from("products").delete().eq("id", id)
      fetchData()
    }
  }

  const handleEditar = (product: any) => {
    setEditando(product)
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image_url: product.image_url,
    })
  }

  if (cargando) {
    return <main><Navbar /><p style={{ textAlign: "center", marginTop: "100px" }}>Cargando...</p></main>
  }

  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #d4b896", borderRadius: "6px", fontFamily: "Georgia, serif", marginBottom: "10px", boxSizing: "border-box" as const }

  return (
    <main style={{ minHeight: "100vh", background: "#f5e6d3" }}>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}>
        <h2 style={{ fontSize: "2rem", color: "#1a1a2e", marginBottom: "30px" }}>Panel de Administración</h2>

        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <button onClick={() => setVista("ordenes")} style={{ padding: "10px 24px", background: vista === "ordenes" ? "#1a1a2e" : "#fdf6f0", color: vista === "ordenes" ? "white" : "#1a1a2e", border: "1px solid #1a1a2e", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
            Órdenes ({orders.length})
          </button>
          <button onClick={() => setVista("productos")} style={{ padding: "10px 24px", background: vista === "productos" ? "#1a1a2e" : "#fdf6f0", color: vista === "productos" ? "white" : "#1a1a2e", border: "1px solid #1a1a2e", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ color: "#1a1a2e" }}>Productos</h3>
              <button onClick={() => { setNuevoProducto(true); setEditando(null); setForm({ name: "", description: "", price: "", stock: "", image_url: "" }) }}
                style={{ background: "#1a1a2e", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>
                + Agregar producto
              </button>
            </div>

            {(editando || nuevoProducto) && (
              <div style={{ background: "#fdf6f0", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #d4b896" }}>
                <h4 style={{ marginBottom: "16px", color: "#1a1a2e" }}>{editando ? "Editar producto" : "Nuevo producto"}</h4>
                <input style={inputStyle} placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input style={inputStyle} placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <input style={inputStyle} placeholder="Precio" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <input style={inputStyle} placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                <input style={inputStyle} placeholder="URL de imagen" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={handleGuardar} style={{ background: "#1a1a2e", color: "white", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>
                    Guardar
                  </button>
                  <button onClick={() => { setEditando(null); setNuevoProducto(false) }} style={{ background: "none", border: "1px solid #1a1a2e", color: "#1a1a2e", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" }}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fdf6f0", borderRadius: "8px", overflow: "hidden" }}>
              <thead>
                <tr style={{ background: "#1a1a2e", color: "white" }}>
                  <th style={{ padding: "12px", textAlign: "left" }}>Nombre</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Precio</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Stock</th>
                  <th style={{ padding: "12px", textAlign: "left" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #e8d5c0" }}>
                    <td style={{ padding: "12px" }}>{product.name}</td>
                    <td style={{ padding: "12px" }}>${product.price.toLocaleString("es-AR")}</td>
                    <td style={{ padding: "12px" }}>{product.stock}</td>
                    <td style={{ padding: "12px", display: "flex", gap: "8px" }}>
                      <button onClick={() => handleEditar(product)} style={{ background: "#1a1a2e", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
                        Editar
                      </button>
                      <button onClick={() => handleEliminar(product.id)} style={{ background: "#c0392b", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}>
                        Eliminar
                      </button>
                    </td>
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