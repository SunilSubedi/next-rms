"use client";

import React, { useState } from "react";
import { PlusCircle, MinusCircle, CheckCircle2 } from "lucide-react";

interface Food {
  id: number;
  name: string;
  price: number;
}

const sampleFoods: Food[] = [
  { id: 1, name: "Chicken Burger", price: 12.5 },
  { id: 2, name: "Veggie Pizza", price: 15.0 },
  { id: 3, name: "Coke", price: 3.5 },
  { id: 4, name: "French Fries", price: 5.0 },
];

export default function CreateOrderPage() {
  const [customerName, setCustomerName] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [selectedFoods, setSelectedFoods] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (foodId: number, delta: number) => {
    setSelectedFoods((prev) => {
      const newQty = (prev[foodId] || 0) + delta;
      if (newQty <= 0) {
        const { [foodId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [foodId]: newQty };
    });
  };

  const total = Object.entries(selectedFoods).reduce((sum, [id, qty]) => {
    const food = sampleFoods.find((f) => f.id === Number(id));
    return sum + (food ? food.price * qty : 0);
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      customerName,
      seatNumber,
      items: Object.entries(selectedFoods).map(([id, qty]) => ({
        foodId: Number(id),
        quantity: qty,
      })),
      total,
    };
    console.log("Order created:", orderData);
    alert("✅ Order Created Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">Create New Order</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Table Number</label>
            <input
              type="text"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. T3"
              required
            />
          </div>
        </div>

        {/* Food List */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Food</h2>
          <div className="space-y-2">
            {sampleFoods.map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between border rounded-lg px-4 py-2"
              >
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-gray-500">${food.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(food.id, -1)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <MinusCircle size={22} />
                  </button>
                  <span className="font-semibold">
                    {selectedFoods[food.id] || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(food.id, 1)}
                    className="text-green-500 hover:text-green-600"
                  >
                    <PlusCircle size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center border-t pt-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            <CheckCircle2 size={20} />
            Create Order
          </button>
        </div>
      </form>
    </div>
  );
}
