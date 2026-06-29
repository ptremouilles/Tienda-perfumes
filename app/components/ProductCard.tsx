import { useState } from "react"

type ProductCardProps = {
  nombre: string
  descripcion: string
  precio: string
  imagen: string
  onAgregar: () => void
}

export default function ProductCard({ nombre, descripcion, precio, imagen, onAgregar }: ProductCardProps) {
  const [agregado, setAgregado] = useState(false)

  const handleAgregar = () => {
    onAgregar()
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  return (
    <article>
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p>{precio}</p>
      <button onClick={handleAgregar} style={{ background: agregado ? "#27ae60" : "" }}>
        {agregado ? "¡Agregado! ✓" : "Agregar al carrito"}
      </button>
    </article>
  )
}