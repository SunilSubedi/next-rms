import React, { cloneElement } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ensureUserInDatabase } from "../actions/addNewUser";
import Navbar from "../component/navbar";
import SideBar from "../component/sidebar";

export default async function Layout({children}: {children:React.ReactNode})
{
    async function getUserRole()
  {
      const user = await currentUser();
      if(!user)
  {
    redirect("/sign-in")
  }
  else{
        const name = user.fullName || "";
        const clerkUserId = user.id;
        const imageUrl = user.imageUrl;
        const email = user.emailAddresses[0].emailAddress
        

        try
        {
        const  newUser  =  await  ensureUserInDatabase({clerkUserId, email, name, imageUrl})
        return newUser
        
        
        }catch(err){
            console.error(err)
           
        };
  }
  }

  const newUser = await getUserRole();


  console.log(newUser?.role)


  

      return (
      
        <div className=" flex h-screen bg-gray-50 text-gray-900">

            <SideBar/>
            <main className="flex-1 flex flex-col">
            <Navbar/>
            {children}
            </main>
        </div>
      )
}