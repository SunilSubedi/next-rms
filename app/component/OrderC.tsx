"use client"
import React from 'react'
import FoodList from './FoodList'
import OrderForm from './OrderForm'
import { FoodData } from '@/types/foodTypes'
import { useReducer } from 'react'
import { orderReducer, initialstate } from '@/reducer/orderItemsReducer'
import { OrderItem } from '@/types/orderTypes'

interface OrderCProps{
    data: FoodData[];
    
}



export default function OrderC({data}: OrderCProps ) {

    const [state, dispatch] = useReducer(orderReducer, initialstate);

    const handleAdd = (item: FoodData) => {
        dispatch({ type:'ADD_ITEM', payload: {...item, quantity : 1}})
    }
    

  return (
            <div className="grid grid-cols-2 gap-6 p-8 min-h-screen bg-gray-50">
                <FoodList data={data} onAdd = {handleAdd} />
                <OrderForm  ordersItem={state} dispatch={dispatch}/>
            </div>
  )
    
}
