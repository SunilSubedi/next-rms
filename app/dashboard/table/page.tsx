import { table } from 'console';
import React from 'react'
import Link from 'next/link';
import Table from '@/app/ui/table';
import { getTables } from '@/app/actions/tableActions';

interface TableSchema{
    id: string,
    number: number,
    seats: number,
    status: "AVAILABLE" | "OCCUPIED" | "RESERVED",
  

}


const columns:{key: keyof TableSchema; label: string}[] =[

    { key:"number", label:"Table Number"},
    { key:"seats", label:"Seats"},
    { key:"status", label:"Status"},


]

export default async function TableComponent() {

    const table = await getTables();

  return (
    <div className=" flex-col p-2 ">
        <div className="flex">
        <Link href="/dashboard/table/new" className="p-2 bg-blue-300 border hover:bg-blue-600 hover:text-white rounded m-2">Add New Table</Link>
        </div>
        <Table columns={columns} data={table}></Table>
        </div>
  )
}
