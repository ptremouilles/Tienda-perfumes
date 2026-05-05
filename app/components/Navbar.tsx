type NavbarProps = {
    carrito: number
  }
  
  export default function Navbar({ carrito }: NavbarProps) {
    return (
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
    )
  }