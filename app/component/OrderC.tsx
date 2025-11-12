"use client"
import React from 'react'
import FoodList from './FoodList'
import OrderForm from './OrderForm'
import { FoodData } from '@/types/foodTypes'
import { useReducer } from 'react'
import { orderReducer, initialstate } from '@/reducer/orderItemsReducer'
import { OrderInput } from '@/types/orderTypes'
import { TableData } from '@/types/tableTypes'

interface OrderCProps{
    data: FoodData[];
    tables: TableData[];
    createOrder: ( payload: OrderInput) => Promise<boolean>;
    
    
    
}



export default function OrderC({data, tables, createOrder}: OrderCProps ) {

    const [state, dispatch] = useReducer(orderReducer, initialstate);

    const handleAdd = (item: FoodData) => {
        dispatch({ type:'ADD_ITEM', payload: {...item, quantity : 1}})
    }
    

  return (
            <div className="grid grid-cols-2 gap-6 p-8 min-h-screen bg-gray-50">
                <FoodList data={data} onAdd = {handleAdd} />
                <OrderForm  createOrder= { createOrder} ordersItem={state} dispatch={dispatch} tables={tables}/>
            </div>
  )
    
}
