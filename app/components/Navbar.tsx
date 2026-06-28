"use client"

import { useCarrito } from "./CarritoContext"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { totalItems } = useCarrito()
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
    <header>
      <nav>
        <h1>Lumière Parfums</h1>
        <ul>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/catalogo">Catálogo</Link></li>
          <li><a href="#">Nosotros</a></li>
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
          <Link href="/carrito">
            <p>🛒 {totalItems}</p>
          </Link>
        </div>
      </nav>
    </header>
  )
}