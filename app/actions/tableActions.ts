"use server"
import { db } from '@/lib/db'
import { Table } from '@prisma/client'

interface TableInput {
  number: number | string; // can be string if coming from form input
  seats: number | string;
}

export async function getTables():Promise<Table[]> {
    try
    {
            const data = await db.table.findMany();
            return data
    }catch(err)
    {
        console.error(err);
        return []
    }
    
}

export async function postTable(tableData:TableInput): Promise<boolean> {

    try
    {
        await db.table.create({
            data: {
                number: Number(tableData.number),
                seats: Number(tableData.seats)
            }
        })
        return true;
    }catch(error)
    {
        console.error(error)
        return false;
    }

    
}