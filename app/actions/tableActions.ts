"use server"
import { db } from '@/lib/db'
import { TableInput, TableData } from '@/types/tableTypes'


export async function getTables():Promise<TableData[]> {
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