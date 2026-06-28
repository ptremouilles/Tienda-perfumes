import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, total, userEmail } = body

    console.log("Creando orden para:", userEmail, "Total:", total)

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ user_email: userEmail, total, status: "pending" })
      .select()
      .single()

    if (orderError) {
      console.error("Error creando orden:", orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }

    console.log("Orden creada:", order.id)

    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.cantidad,
      unit_price: parseInt(item.precio.replace(/[$\.]/g, ""))
    }))

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)

    if (itemsError) {
      console.error("Error creando items:", itemsError)
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error("Error general:", error)
    return NextResponse.json({ error: "Error al procesar la orden" }, { status: 500 })
  }
}