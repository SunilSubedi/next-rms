"use server"
import { db }  from "@/lib/db"
import { Food } from "@prisma/client";
import { uploadToLocal } from '@/lib/upload'







export  async function getAllFoods(): Promise<Food[]> {

    try
    {
        const foods = await db.food.findMany();
        return foods;
    }
    catch(err)
    {
        console.error("Error While Fetching Food")
        return [];
    }
    

}



export  async function addFood(fooddata: any): Promise<boolean> {

  
    try
    {
    let foodImageUrl = ""
    const foodFile = fooddata.image?.[0]
    if(foodFile)
    {
        
        const imageUrl = await uploadToLocal(foodFile)
        foodImageUrl = imageUrl
        console.log(imageUrl)
    }

        await db.food.create({
            data: {
                name:fooddata.name,
                description: fooddata.description,
                price: Number(fooddata.price),
                imageUrl: foodImageUrl || null,


            },

    }); 

    return  true;
}  
catch(err)
{
    console.error(err)
    return false;
}    
     
     
}



