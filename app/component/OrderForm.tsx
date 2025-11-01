"use client"
import React from 'react'
import { OrderState } from '@/types/orderTypes'


interface OrderFormProps{
   ordersItem: OrderState,
   dispatch:React.Dispatch<any>
}

export default function OrderForm({ordersItem, dispatch }: OrderFormProps) {

  

  const handleClear = () =>{
    console.log("Here")
    dispatch({ type:'CLEAR'})

  }

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
              { ordersItem.items.map(food => (
                  <li key={food.id} className="flex justify-between text-gray-600">
                <span>{food.name} x <b>{food.quantity}</b>
                </span>
                <span>${food.price * food.quantity} </span>
                </li>

              ))}
            
             
            </ul>
            { ordersItem.items.length > 0 && (
            <div className=' text-center'>
              
             <button onClick={handleClear} className='p-2 bg-red-300 text-sm'>Clear</button>
             </div>
             )}
            <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>${ordersItem.items.reduce((sum, food) => sum + food.price * food.quantity, 0)}</span>
            </div>
          </div>
        </div>

        <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 font-medium transition">
          Create Order
        </button>
      </div>
  )
}
