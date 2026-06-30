# Lumière Parfums

E-commerce de perfumes artesanales desarrollado con Next.js, React, TypeScript y Supabase.

Demo en vivo: https://tienda-perfumes-zeta.vercel.app

## Descripción

Lumière Parfums es una tienda online de fragancias artesanales que permite a los usuarios explorar el catálogo, registrarse, agregar productos al carrito y realizar compras a través de Mercado Pago. Cuenta con un sistema de roles que distingue entre usuarios clientes y administrador.

## Tecnologías

- Frontend: Next.js 15, React, TypeScript
- Base de datos: Supabase (PostgreSQL)
- Autenticación: Supabase Auth
- Pagos: Mercado Pago Checkout Pro (sandbox)
- Deploy: Vercel + GitHub CI/CD
- Estilos: CSS puro con variables

## Funcionalidades

- Catálogo de productos cargado desde Supabase
- Registro e inicio de sesión de usuarios
- Carrito lateral deslizable con persistencia en localStorage
- Órdenes guardadas en base de datos
- Página de "Mis órdenes" donde cada usuario ve su historial de compras
- Sistema de roles (cliente / administrador)
- Panel de administración exclusivo para el rol admin, con:
  - Visualización de todas las órdenes
  - CRUD completo de productos (crear, editar, eliminar)
- Checkout con Mercado Pago sandbox
- Páginas de resultado: pago completado, fallido y pendiente
- Animaciones fade-in con IntersectionObserver
- Navbar fijo (sticky) al hacer scroll
- Sección de reseñas de clientes
- Diseño responsive

## Roles de usuario

- Cliente: cualquier usuario registrado. Puede comprar y ver su propio historial de órdenes en /ordenes.
- Administrador: usuario con rol "admin" en la tabla user_roles de Supabase. Accede al panel /admin (visible solo para este rol en la navbar) donde puede ver todas las órdenes y gestionar el catálogo de productos.

## Instalación local

1. Clonar el repositorio
2. Instalar dependencias con npm install
3. Crear archivo .env.local con las variables de entorno
4. Correr con npm run dev

## Variables de entorno necesarias

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
MERCADOPAGO_ACCESS_TOKEN
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
NEXT_PUBLIC_APP_URL

## Base de datos

Tablas en Supabase:
- products: catálogo de perfumes
- orders: órdenes de compra
- order_items: items de cada orden
- user_roles: rol de cada usuario (cliente o admin)

## Deploy

El proyecto usa CI/CD con GitHub y Vercel. Cada push a main genera un deploy automático en producción.