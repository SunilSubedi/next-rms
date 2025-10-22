"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";

type Order = {
  id: string;
  customerName: string;
  tableNumber?: number;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
};

export default function Orders() {
  // Simulated data (you’ll replace with Prisma or API fetch)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD001",
      customerName: "John Smith",
      tableNumber: 3,
      totalAmount: 45.5,
      status: "PENDING",
      createdAt: "2025-10-22T12:30:00Z",
    },
    {
      id: "ORD002",
      customerName: "Sarah Lee",
      tableNumber: 1,
      totalAmount: 30.0,
      status: "PROCESSING",
      createdAt: "2025-10-22T13:00:00Z",
    },
    {
      id: "ORD003",
      customerName: "David Chen",
      tableNumber: 5,
      totalAmount: 60.25,
      status: "COMPLETED",
      createdAt: "2025-10-21T19:20:00Z",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "PROCESSING":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
      <h1 className="flex text-2xl font-bold text-gray-800 mb-6">📦 Orders</h1>
      </div>
      <div>
      <Link className="flex" href="/dashboard/orders/new">New Order</Link>
      </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Table</th>
              <th className="p-4 text-left">Total ($)</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{order.id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.tableNumber || "-"}</td>
                <td className="p-4">${order.totalAmount.toFixed(2)}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="p-4 flex justify-center gap-2">
                  {order.status !== "COMPLETED" && (
                    <button
                      onClick={() =>
                        setOrders((prev) =>
                          prev.map((o) =>
                            o.id === order.id
                              ? { ...o, status: "COMPLETED" }
                              : o
                          )
                        )
                      }
                      className="bg-green-500 text-white px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-green-600 transition"
                    >
                      <CheckCircle size={16} /> Complete
                    </button>
                  )}
                  {order.status !== "CANCELLED" && (
                    <button
                      onClick={() =>
                        setOrders((prev) =>
                          prev.map((o) =>
                            o.id === order.id
                              ? { ...o, status: "CANCELLED" }
                              : o
                          )
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-red-600 transition"
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
