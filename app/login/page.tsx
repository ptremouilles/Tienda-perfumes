"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setCargando(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError("Email o contraseña incorrectos")
      setCargando(false)
    } else {
      router.push("/catalogo")
    }
  }

  return (
    <main className="auth-page">
      <Navbar />
      <div className="auth-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
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
            {cargando ? "Cargando..." : "Ingresar"}
          </button>
        </form>
        <p>¿No tenés cuenta? <a href="/registro">Registrate</a></p>
      </div>
    </main>
  )
}