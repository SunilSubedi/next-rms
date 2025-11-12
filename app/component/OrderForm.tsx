"use client"
import React, { useState } from 'react'
import { OrderState, OrderAction, OrderInput } from '@/types/orderTypes'
import { TableData } from '@/types/tableTypes'
import { useRouter } from 'next/navigation'


interface OrderFormProps{
   ordersItem: OrderState,
  dispatch: React.Dispatch<OrderAction>
   tables: TableData[]
    createOrder: ( payload: OrderInput) => Promise<boolean>;
}

export default function OrderForm({ordersItem, dispatch, tables, createOrder }: OrderFormProps) {

    const router = useRouter();
   const [cusname, setCusName] = useState<string>('') 
   const [tableno, setTableNo] = useState<string>('') // keep as string to match table.id
   const [ loading, setLoading] = useState<boolean>(false)
     
     async function handleCreate(){
      if(!cusname || !tableno || ordersItem.items.length === 0) {
        alert('Please fill all fields and add at least one item to the order.')
        return
      }

      if (!cusname.trim()) {
        alert('Customer name cannot be empty or just spaces.')
        return
      }

      setLoading(true)
      try {
         const payload = {
          customerName: cusname,
          tableId: tableno,
          totalAmount: ordersItem.items.reduce((sum, f) => sum + f.price * f.quantity, 0),
          orderItems: ordersItem.items.map(item => ({
            foodId: item.id,
            quantity: Number(item.quantity),
            subtotal: Number(item.price * item.quantity),
          })),
         }
         
         const res =   await createOrder(payload)
         if(!res) {
          alert('Failed to create order. Please try again.')
          return
         }    
         //console.log('Order created successfully:', res)
         alert('Order created successfully!')
         dispatch({ type: 'CLEAR' })
         setCusName('')
         setTableNo('')

      }catch(error){
          console.log('Error creating order:', error)
          alert('Failed to create order. Please try again.')
      }finally{
        setLoading(false)
        router.push('/dashboard/orders')
      }
    }

  const handleRemove = ( itemId: string) => {
     dispatch({ type: 'REMOVE_ITEM', payload:itemId})
  }

  // delta can be +1 or -1; this computes new quantity and clamps to >=1
  const handleUpdate = ( itemId: string, delta: number) => {
      const item = ordersItem.items.find(i => i.id === itemId)
      if (!item) return
      const newQty = Math.max(1, item.quantity + delta)
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity: newQty }})
  }

  const handleClear = () =>{
    dispatch({ type:'CLEAR'})
  }

  const total = ordersItem.items.reduce((sum, food) => sum + food.price * food.quantity, 0)

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Order</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Customer Name</label>
            <input
              type="text"
              value={cusname}
              onChange={(e)=> setCusName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Table Number</label>
            <select
              name="tableno" id="tableno" value={tableno} onChange={(e) => setTableNo(e.currentTarget.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value=""> Select Table </option>
              {tables.filter(table => table.status === 'AVAILABLE').map((table) => (
                <option key={table.id} value={table.id}> Table {table.number} ({table.seats})  </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Selected Items</h3>
            <ul className="space-y-2">
              { ordersItem.items.map(food => (
                  <li key={food.id} className=" flex items-center justify-between text-gray-600 p-2">
                    <div className="flex items-center">
                      <button onClick={() => handleRemove(food.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 rounded mr-2">X</button>
                      <span className='mr-3'>{food.name}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdate(food.id, 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-xl font-bold w-8 h-8 rounded"
                          aria-label={`decrease ${food.name}`}
                        >
                          −
                        </button>
                        <span className='px-2'>{food.quantity}</span>
                        <button
                          onClick={() => handleUpdate(food.id, -1)}
                          className="bg-gray-200 hover:bg-gray-300 text-xl font-bold w-8 h-8 rounded"
                          aria-label={`increase ${food.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="ml-4">${(food.price * food.quantity).toFixed(2)}</div>
                  </li>
              ))}
            </ul>

            { ordersItem.items.length > 0 && (
              <div className=' text-center mt-3'>
                <button onClick={handleClear} className='p-2 bg-red-300 text-sm'>Clear</button>
              </div>
            )}

            <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          className="mt-6 w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 font-medium transition disabled:opacity-50"
          onClick={handleCreate}
          disabled={loading || ordersItem.items.length === 0}
        >
          {loading ? 'Creating…' : 'Create Order'}
        </button>
      </div>
  )
}
