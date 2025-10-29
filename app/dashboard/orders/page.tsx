import React from 'react'
import Link from 'next/link'

export default function Page() {
  return (
     <div className=" flex-col p-2 ">
        <div className="flex">
        <Link href="/dashboard/orders/new" className="p-2 bg-blue-300 border hover:bg-blue-600 hover:text-white rounded m-2">Add New Order</Link>
        </div>
       
        </div>
  )
}
