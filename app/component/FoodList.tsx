"use client"
import React from 'react'
import { Food } from '@prisma/client'
import Image from 'next/image'

interface FoodListProps {
    data: Food[];
    onAdd: (food: Food) => void;
}

export default function FoodList({data, onAdd}: FoodListProps) {
    
  return (
     <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Food Menu</h2>

        <div className="space-y-4">
          {/* Single food item */}
            {data.map(food => (
            <div key={food.name} className="flex items-center justify-between border-b pb-3">

              <div className="flex items-center space-x-4">
               {/* Image */}
               <Image src={`/uploads/${food.imageUrl}`} alt={food.name} width={100} height={100} className="w-16 h-16 object-cover rounded-lg" />
   
            <div>
              <p className="font-medium text-gray-700">{food.name}</p>
              <p className="text-sm text-gray-500">${food.price}</p>
            </div>
            </div>
            <button onClick={() => onAdd(food)} className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
              Add
            </button>
          </div>


            ))}
          
    
        </div>
      </div>
  )
}
