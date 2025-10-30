"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { postTable } from '@/app/actions/tableActions';
import { TableInput } from '@/types/tableTypes';



export default function Page() {
    const { register, handleSubmit, reset, formState: { isSubmitting}} = useForm<TableInput>();
    const [isAdded, setIsAdded] = useState<boolean>(false)
    async function formSubmmited(data:TableInput){

            try
            {
                    const dataPost = await postTable(data)
                    if(dataPost)
                    {  
                    setIsAdded(true)
                    }else
                    {
                        console.log("Error While Adding Data")
                    }
            }catch(error)
            {
                console.error(error)
            }finally
            {
                reset();
                setTimeout(()=> {
                    setIsAdded(false)
                },2000)
            }

    }

  return (
    <div>
        <form onSubmit={handleSubmit(formSubmmited)}>
            <div className='p-2'>
                <input type='number' { ...register("number", {required: true, min:1})} placeholder='Table Number'  className=' block  w-full p-2 rounded'/>
            </div>
             <div className='p-2'>
                <input type='number' { ...register("seats", {required: true, min:1})} placeholder="Total Seats Number"  className=' block  w-full p-2 rounded'/>
            </div>
           
                <div className='p-2'>
                <button type="submit" className='border p-2  rounded bg-blue-200 hover:bg-blue-500 hover:text-white mr-2' >{isSubmitting ? "Adding Table ...." : "Add Table"}</button>
                <button type="reset"  className='border p-2   rounded bg-red-200 hover:bg-red-500 hover:text-white' >Reset Table</button>
                {isAdded && (
                        <span className="p-2 text-green-400 font-bold text-shadow-cyan-100">Table Added</span>
                )}
            </div>
           

        </form>

    </div>
  )
}
