"use client"

import { createContext, useContext, useState, useEffect } from "react"

type Producto = {
  id: string
  nombre: string
  precio: string
  imagen: string
  cantidad: number
}

type CarritoContextType = {
  carrito: Producto[]
  agregarAlCarrito: (producto: Omit<Producto, "cantidad">) => void
  quitarDelCarrito: (id: string) => void
  modificarCantidad: (id: string, cantidad: number) => void
  vaciarCarrito: () => void
  totalItems: number
}

const CarritoContext = createContext<CarritoContextType | null>(null)

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [carrito, setCarrito] = useState<Producto[]>([])

  useEffect(() => {
    const guardado = localStorage.getItem("carrito")
    if (guardado) {
      setCarrito(JSON.parse(guardado))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (producto: Omit<Producto, "cantidad">) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id)
      if (existe) {
        return prev.map((p) => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const quitarDelCarrito = (id: string) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
    localStorage.removeItem("carrito")
  }

  const modificarCantidad = (id: string, cantidad: number) => {
    setCarrito((prev) =>
      prev.map((p) => p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad + cantidad) } : p)
    )
  }

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, modificarCantidad, vaciarCarrito, totalItems }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) throw new Error("useCarrito debe usarse dentro de CarritoProvider")
  return context
}