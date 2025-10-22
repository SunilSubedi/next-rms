
import { db } from "@/lib/db"

type user =
{
    clerkUserId: string,
    email: string,
    name: string,
    imageUrl: string
}

export async function ensureUserInDatabase(user: user)
{
     
   const existingUser = await db.user.findUnique({
      where: { clerkUserId: user.clerkUserId }
   })

   if (existingUser) return existingUser

   const newUser = await db.user.create({
            data: {
                clerkUserId:user.clerkUserId,
                email:user.email,
                name:user.name,
                imageUrl:user.imageUrl,
                role:"customer",//default role           
                },
    });

    return newUser;
}