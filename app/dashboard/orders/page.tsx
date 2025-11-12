import React from 'react'
import Link from 'next/link'
import { fetchOrders } from '@/app/actions/orderAction'
import OrderListClient from '@/app/component/OrderListClient';
import type { OrderView, OrderItemView } from '@/types/orderTypes'

export default async  function Page() {

    const orders: OrderView[] = await fetchOrders();
    console.log('Fetched orders:', orders);
    const serialized = orders.map((order: OrderView) => ({
      id: order.id,
      customerName: order.customerName,
      tableNumber: order.tableNumber,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt?.toISOString() ?? null,
      updatedAt: order.updatedAt?.toISOString() ?? null,
      orderItems: order.orderItems.map((item: OrderItemView) => ({
        id: item.id,
        itemName: item.itemName,
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
  status: (order as unknown as { status?: string }).status ?? 'PENDING',
    }))

  return (
     <div className=" flex-col p-2 ">
        <div className="flex">
        <Link href="/dashboard/orders/new" className="p-2 bg-blue-300 border hover:bg-blue-600 hover:text-white rounded m-2">Add New Order</Link>
        </div>
          <OrderListClient orders={serialized} />
        </div>
  )
}
