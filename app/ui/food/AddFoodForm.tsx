
"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { FoodFormData } from '@/types/foodTypes'

import { addFood } from '@/app/actions/addFood'


export default function AddFoodForm() {

    const { register, handleSubmit, watch, reset, formState: {isSubmitting} } = useForm<FoodFormData>(); 
    const [preview, setPreview]= useState<string | null>()
    const [ isAdded, setIsAdded] = useState<boolean>(false)

    const  imageFile = watch("image");
    

    const  foodSubmit = async (data: FoodFormData) => {

           try
           {
              console.log("Subbmitting...", data);
              const isAdded = await  addFood(data)
              console.log("Form Submitted") 
              setIsAdded(true);
              
           }
           catch(err)
           {
             console.error(err)
           }
           finally
           {
              
              reset();
              setPreview(null)
              setTimeout(() => {
                setIsAdded(false)


              },3000)
              
           }
    }

    useEffect(() => {
       if(imageFile && imageFile[0])
       {
        const file = imageFile[0];
        setPreview(URL.createObjectURL(file))
       }

    },[imageFile])

  return (
    <div> 

        <form onSubmit={handleSubmit(foodSubmit)}>
            <div className='p-2'>
            <input { ...register("name", {required: true})} placeholder='Food Name' className='border border-gray-300 block  w-full text-gray-500 text-sm rounded-lg p-2' />
            </div>
            <div className='p-2'>
            <textarea  { ...register("description",{minLength:20})} placeholder="Description of Food" className='block w-full border border-gray-300 rounded-lg 
             p-2 text-sm text-gray-700 
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             resize-none shadow-sm' />
            </div>
            <div className='p-2'>
                <input type="number" { ...register("price")} placeholder="Price of Food" className='border border-gray-300 block  w-full text-gray-500 text-sm rounded-lg p-2' />
            </div>
            <div className='p-2'>
                <input type="file" { ...register("image")} placeholder="Price of Food" accept='image/*' className='block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-lg p-1'  />
                {preview && (
                    <Image src={preview} alt="food image" height={100} width={100} />
                )}
            </div>
            <div className='p-2'>
                <button type="submit" className='border p-2  rounded bg-blue-200 hover:bg-blue-500 hover:text-white mr-2' >{isSubmitting ? "Adding Food ...." : "Add Food"}</button>
                <button type="reset"  className='border p-2   rounded bg-red-200 hover:bg-red-500 hover:text-white' >Reset Form</button>
                {isAdded && (
                        <span className="p-2 text-green-400 font-bold text-shadow-cyan-100">Food Added</span>
                )}
            </div>
            

        </form>

    </div>
  )
}
