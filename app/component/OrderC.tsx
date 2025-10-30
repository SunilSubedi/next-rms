"use client"
import React from 'react'
import FoodList from './FoodList'
import OrderForm from './OrderForm'
import { FoodData } from '@/types/foodTypes'
import { useState } from 'react'

interface OrderCProps{
    data: FoodData[];
}

export default function OrderC({data}: OrderCProps ) {

    const [selectedFood, setSelectedFood] = useState<FoodData[]>([])

    const handleAdd = (food: FoodData ) => {
        setSelectedFood([...selectedFood, food]);
        //console.log("Added To Selected Foods", selectedFood)
    }

  return (
            <div className="grid grid-cols-2 gap-6 p-8 min-h-screen bg-gray-50">
                <FoodList data={data} onAdd = {handleAdd} />
                <OrderForm data={selectedFood}/>
            </div>
  )
    
}
