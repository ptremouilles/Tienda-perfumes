type ProductCardProps = {
    nombre: string
    descripcion: string
    precio: string
    onAgregar: () => void
  }
  
  export default function ProductCard({ nombre, descripcion, precio, onAgregar }: ProductCardProps) {
    return (
      <article>
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p>{precio}</p>
        <button onClick={onAgregar}>Agregar al carrito</button>
      </article>
    )
  }