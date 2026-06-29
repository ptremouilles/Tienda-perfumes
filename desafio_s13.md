# Desafío Semana 13 — Integración Mercado Pago Sandbox

## Setup de Mercado Pago

1. Creé una cuenta en mercadopago.com.ar/developers
2. Creé una aplicación llamada `lumiere-parfums-sandbox` con Checkout Pro
3. Obtuve las credenciales de sandbox (Public Key y Access Token)
4. Agregué las variables de entorno en `.env.local` y en Vercel

## Instalación del SDK

```bash
npm install mercadopago
```

## API creada

### POST /api/pagos/crear-preferencia

Recibe el `order_id`, obtiene la orden y sus items desde Supabase, y crea una preferencia de pago en Mercado Pago.

**Flujo:**
1. Obtiene la orden desde Supabase usando el order_id
2. Obtiene los items con sus productos relacionados
3. Crea una preferencia con items, email del comprador y URLs de retorno
4. Retorna el init_point para redirigir al usuario al checkout

## Páginas de resultado

- `/pago-completado` — muestra mensaje de éxito cuando el pago fue aprobado
- `/pago-fallido` — informa el rechazo y ofrece volver al carrito
- `/pago-pendiente` — notifica que el pago está siendo procesado

## Resultados del testing

Se usó una cuenta Buyer Test User de Mercado Pago en modo sandbox.

| Escenario | Titular | Resultado |
|-----------|---------|-----------|
| Pago aprobado | APRO | Redirige a /pago-completado ✅ |
| Pago rechazado | OTHE | Pantalla de error en Mercado Pago |
| Pago pendiente | CONT | Pantalla de pendiente en Mercado Pago |



## Cuenta de prueba para testing

Para probar el checkout en sandbox usar la siguiente cuenta de Mercado Pago:

- Usuario: TESTUSER8714... (ver panel de developers)
- Contraseña: 4cRS7u6hoS

## Tarjetas de prueba

| Tarjeta | Número | Vencimiento | CVV | Titular | Resultado |
|---------|--------|-------------|-----|---------|-----------|
| Mastercard | 5031 7557 3453 0604 | 11/30 | 123 | APRO | Pago aprobado |
| Mastercard | 5031 7557 3453 0604 | 11/30 | 123 | OTHE | Pago rechazado |
| Mastercard | 5031 7557 3453 0604 | 11/30 | 123 | CONT | Pago pendiente |

DNI para pagos aprobados y rechazados: 12345678