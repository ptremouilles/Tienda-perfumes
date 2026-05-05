"use client"

import { useState } from "react"

export default function Home() {
  const [carrito, setCarrito] = useState(0)
  const [error, setError] = useState("")
  const [exito, setExito] = useState(false)

  const agregarAlCarrito = () => {
    setCarrito(carrito + 1)
  }

  return (
    <main>
      <header>
        <nav>
          <h1>Lumière Parfums</h1>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Catálogo</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
          <p>🛒 {carrito}</p>
        </nav>
      </header>

      <section>
        <h2>Descubrí tu fragancia ideal</h2>
        <p>Perfumes únicos para momentos inolvidables.</p>
        <a href="#">Ver catálogo</a>
      </section>

      <section>
        <h2>Nuestros productos</h2>
        <ul>
          <li>
            <article>
              <h3>Nuit Dorée</h3>
              <p>Una fragancia cálida con notas de vainilla y ámbar.</p>
              <p>$45.000</p>
              <button onClick={agregarAlCarrito}>Agregar al carrito</button>
            </article>
          </li>
          <li>
            <article>
              <h3>Rosé Éternel</h3>
              <p>Floral y fresco, ideal para el día a día.</p>
              <p>$38.000</p>
              <button onClick={agregarAlCarrito}>Agregar al carrito</button>
            </article>
          </li>
          <li>
            <article>
              <h3>Bois Mystère</h3>
              <p>Amaderado e intenso para las noches especiales.</p>
              <p>$52.000</p>
              <button onClick={agregarAlCarrito}>Agregar al carrito</button>
            </article>
          </li>
        </ul>
      </section>

      <section>
        <h2>Contacto</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          const nombre = (e.currentTarget.elements.namedItem("nombre") as HTMLInputElement).value
          const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value
          const mensaje = (e.currentTarget.elements.namedItem("mensaje") as HTMLTextAreaElement).value

          if (!nombre || !email || !mensaje) {
            setError("Por favor completá todos los campos.")
            setExito(false)
            return
          }

          if (!email.includes("@")) {
            setError("El email no es válido.")
            setExito(false)
            return
          }

          setError("")
          setExito(true)
        }}>
          <input type="text" name="nombre" placeholder="Tu nombre" />
          <input type="email" name="email" placeholder="Tu email" />
          <textarea name="mensaje" placeholder="Tu mensaje"></textarea>
          {error && <p style={{color: "red"}}>{error}</p>}
          {exito && <p style={{color: "green"}}>¡Mensaje enviado!</p>}
          <button type="submit">Enviar</button>
        </form>
      </section>

      <footer>
        <p>© 2026 Lumière Parfums. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}