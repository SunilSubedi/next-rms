"use client"
import React, { useState } from "react"

type OrderItem = { id: string; itemName: string; quantity: number; subtotal: number }
type Order = {
  id: string
  customerName: string
  tableNumber: number | null
  totalAmount: number
  createdAt: string | null
  updatedAt: string | null
  orderItems: OrderItem[]
  status?: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED" | string
}

const STATUSES = [
  { key: "PENDING", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { key: "PROCESSING", label: "Processing", color: "bg-blue-100 text-blue-800" },
  { key: "COMPLETED", label: "Completed", color: "bg-green-100 text-green-800" },
  { key: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" },
]

export default function OrderListClient({ orders }: { orders: Order[] }) {
  const [list, setList] = useState<Order[]>(orders)
  const [updating, setUpdating] = useState<Record<string, boolean>>({})
  const [payingFor, setPayingFor] = useState<string | null>(null)
  const [paymentAmount, setPaymentAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CARD" | "ONLINE">("CARD")

  async function changeStatus(id: string, status: string) {
    setUpdating((s) => ({ ...s, [id]: true }))
    try {
      setList((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    } catch (err) {
      console.error(err)
      alert("Failed to update status")
    } finally {
      setUpdating((s) => ({ ...s, [id]: false }))
    }
  }

  async function createPayment(orderId: string) {
    const amount = parseFloat(paymentAmount)
    if (Number.isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount")
      return
    }
    try {
        //payment logic to be implemented
    } catch (err) {
      console.error(err)
      alert("Failed to create payment")
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {list.map((order) => (
        <article key={order.id} className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium">{order.customerName}</h3>
              <div className="text-sm text-gray-500">
                Table: {order.tableNumber ?? "—"} · {order.createdAt ? new Date(order.createdAt).toISOString().slice(0,19).replace("T", " ") : "—"}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-semibold">${order.totalAmount.toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-3 space-y-1 text-sm text-gray-700 grow">
            {order.orderItems.slice(0, 4).map((it) => (
              <div key={it.id} className="flex justify-between">
                <div className="truncate">{it.itemName} x{it.quantity}</div>
                <div>${it.subtotal.toFixed(2)}</div>
              </div>
            ))}
            {order.orderItems.length > 4 && (
              <div className="text-xs text-gray-400">+{order.orderItems.length - 4} more items</div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select
                aria-label={`Change status for ${order.id}`}
                value={order.status ?? "PENDING"}
                onChange={(e) => changeStatus(order.id, e.target.value)}
                className="rounded border px-2 py-1 text-sm"
                disabled={!!updating[order.id]}
              >
                {STATUSES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>

              <span className={`text-xs px-2 py-1 rounded ${STATUSES.find(s => s.key === order.status)?.color ?? "bg-gray-100"}`}>
                {STATUSES.find(s => s.key === order.status)?.label ?? order.status}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigator.clipboard?.writeText(order.id)}
                className="text-xs text-gray-500 hover:text-gray-800"
                title="Copy order id"
              >
                Copy ID
              </button>

              <button
                onClick={() => setPayingFor(order.id)}
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Add Payment
              </button>
            </div>
          </div>

          {/* Payment modal (simple) */}
          {payingFor === order.id && (
            <div className="mt-3 border-t pt-3">
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-1/2 border rounded px-2 py-1"
                />
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as 'CASH' | 'CARD' | 'ONLINE')} className="border rounded px-2 py-1">
                  <option value="CASH">Cash</option>
                  <option value="CARD">Card</option>
                  <option value="ONLINE">Online</option>
                </select>
              </div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => createPayment(order.id)} className="px-3 py-1 bg-green-600 text-white rounded">Pay</button>
                <button onClick={() => setPayingFor(null)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}