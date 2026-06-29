"use client"

import { useCarrito } from "./CarritoContext"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import CarritoLateral from "./CarritoLateral"

export default function Navbar() {
  const { totalItems, carritoAbierto, setCarritoAbierto } = useCarrito()
  const [usuario, setUsuario] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUsuario(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <>
      <header>
        <nav>
          <Link href="/"><h1>Lumière Parfums</h1></Link>
          <ul>
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/catalogo">Catálogo</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/#contacto">Contacto</Link></li>
          </ul>
          <div className="nav-auth">
            {usuario ? (
              <>
                <span className="nav-email">{usuario.email}</span>
                <button onClick={handleLogout} className="nav-logout">Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-login">Iniciar sesión</Link>
                <Link href="/registro" className="nav-registro">Registrarse</Link>
              </>
            )}
            <button
              onClick={() => setCarritoAbierto(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#f5e6d3", fontSize: "1rem", display: "flex", alignItems: "center", gap: "4px" }}
            >
              🛒 {totalItems}
            </button>
          </div>
        </nav>
      </header>
      <CarritoLateral abierto={carritoAbierto} onCerrar={() => setCarritoAbierto(false)} />
    </>
  )
}