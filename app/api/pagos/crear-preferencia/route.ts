import { NextRequest, NextResponse } from "next/server"
import { MercadoPagoConfig, Preference } from "mercadopago"
import { createClient } from "@supabase/supabase-js"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { order_id } = await request.json()

    // Obtener la orden con sus items
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 })
    }

    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*, products(*)")
      .eq("order_id", order_id)

    if (itemsError || !items) {
      return NextResponse.json({ error: "Items no encontrados" }, { status: 404 })
    }

    // Crear preferencia de Mercado Pago
    const preference = new Preference(client)
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.product_id,
          title: item.products.name,
          quantity: item.quantity,
          unit_price: item.unit_price,
          currency_id: "ARS",
        })),
        payer: {
          email: order.user_email,
        },
        back_urls: {
            success: "https://tienda-perfumes-zeta.vercel.app/pago-completado",
            failure: "https://tienda-perfumes-zeta.vercel.app/pago-fallido",
            pending: "https://tienda-perfumes-zeta.vercel.app/pago-pendiente",
          },
          auto_return: "approved",
        external_reference: order_id,
      },
    })

    return NextResponse.json({ init_point: result.init_point })
  } catch (error) {
    console.error("Error creando preferencia:", error)
    return NextResponse.json({ error: "Error al crear preferencia" }, { status: 500 })
  }
}