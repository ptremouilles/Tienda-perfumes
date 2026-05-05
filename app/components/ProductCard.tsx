type ProductCardProps = {
    nombre: string
    descripcion: string
    precio: string
    imagen: string
    onAgregar: () => void
  }
  
  export default function ProductCard({ nombre, descripcion, precio, imagen, onAgregar }: ProductCardProps) {
    return (
      <article>
        <img src={imagen} alt={nombre} />
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <p>{precio}</p>
        <button onClick={onAgregar}>Agregar al carrito</button>
      </article>
    )
  }