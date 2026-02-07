'use server'

import { createClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'

export async function createOrder(orderData: {
    customer_name: string;
    customer_phone: string;
    delivery_address: string;
    message?: string;
    total_amount: number;
    items: Array<{
        flower_id: string;
        size: string;
        quantity: number;
        unit_price: number;
    }>;
}) {
    const supabase = await createClient()

    try {
        // 1. Insert the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                customer_name: orderData.customer_name,
                customer_phone: orderData.customer_phone,
                delivery_address: orderData.delivery_address,
                message: orderData.message,
                total_amount: orderData.total_amount,
                status: 'pending'
            })
            .select()
            .single()

        if (orderError) throw orderError

        // 2. Insert order items
        const orderItems = orderData.items.map(item => ({
            order_id: order.id,
            flower_id: item.flower_id,
            size: item.size,
            quantity: item.quantity,
            unit_price: item.unit_price
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) throw itemsError

        revalidatePath('/[locale]/admin/orders', 'page')

        return { success: true, orderId: order.id }

    } catch (error) {
        const errorMsg = (error as any).message || 'Unknown error';
        console.error('CRITICAL: Error creating order:', error);
        return { success: false, error: errorMsg }
    }
}
