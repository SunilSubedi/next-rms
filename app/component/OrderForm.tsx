"use client"
import React from 'react'


interface FoodProps{
   data : any[]
}

export default function OrderForm({data}: FoodProps) {

  console.log(data)
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Order</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Customer Name</label>
            <input
              type="text"
              placeholder="Enter customer name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Table Number</label>
            <input
              type="number"
              placeholder="Enter table number"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Selected Items</h3>
            <ul className="space-y-2">
              { data.map(food => (
                  <li key={food.id} className="flex justify-between text-gray-600">
                <span>{food.name}</span>
                <span>${food.price}</span>
                </li>

              ))}
            
             
            </ul>

            <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>{data.reduce((sum, food) => sum + food.price, 0)}</span>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 font-medium transition">
          Create Order
        </button>
      </div>
  )
}
