import { z } from "zod"

export const foodSchema = z.object({

    name:z.string().min(1,"Name is Required"),
    description: z.string().optional(),
    price:z.number().min(0,"Price must be postive"),
    imageUrl:z.string().url("Invalid Image Url").optional(),
    available:z.boolean().default(true)



})