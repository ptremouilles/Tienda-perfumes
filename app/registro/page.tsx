"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

export default function Registro() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError("Error al registrarse. Intentá de nuevo.")
      setCargando(false)
    } else {
      router.push("/catalogo")
    }
  }

  return (
    <main className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h2>Crear cuenta</h2>
        <form onSubmit={handleRegistro}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={cargando}>
            {cargando ? "Cargando..." : "Registrarse"}
          </button>
        </form>
        <p>¿Ya tenés cuenta? <a href="/login">Iniciá sesión</a></p>
      </div>
    </main>
  )
}