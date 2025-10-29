import React from 'react'
import Table from '@/app/ui/table'
//import { columns, users } from '@/lib/test-data'
import {getAllFoods } from '@/app/actions/addFood'
import { columns } from './columns'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function page() {
    
  const foods = await getAllFoods()
  if(foods.length <= 0)
  {
        redirect('/dashboard/food/new')
  }

    
  return (
    <div className=" flex-col p-2 ">
        <div className="flex">
        <Link href="/dashboard/food/new" className="p-2 bg-blue-300 border hover:bg-blue-600 hover:text-white rounded m-2">Add New Food</Link>
        </div>
        <Table columns={columns} data={foods}></Table>
        </div>
  )
}
