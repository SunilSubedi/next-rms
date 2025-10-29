
import React from 'react'
import { addFood } from '@/app/actions/addFood'
import { redirect } from 'next/navigation';
import AddFoodForm from '@/app/ui/food/AddFoodForm';

export  default async function AddFood() {

    // const isFood = await addFood();
    // if(isFood)
    // {
    //     redirect('/dashboard/food')
    // }
    // else
    // {
    //     console.log("Error While Adding Food")
    // }

  return (
    <div><AddFoodForm/></div>
  )
}
