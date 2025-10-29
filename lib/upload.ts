"use server"
import fs from "fs"
import path from "path"



export  async function uploadToLocal(foodFile: File): Promise<string>
{
     
    const bytes = await foodFile.arrayBuffer();
    const buffer = Buffer.from(bytes)



    const uploadDir = path.join(process.cwd(), "public/uploads")

    const  filename = foodFile.name;

    const filePath = path.join(uploadDir, filename)


    await fs.promises.writeFile(filePath, buffer)



    return filename;





}