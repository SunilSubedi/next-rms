
export interface FoodFormData {
  name: string;
  description?: string;
  price: number | string; // string if coming from input
  image?: FileList;
}


export interface FoodData{
    name: string;
    id: string;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    price: number;
    available: boolean;
}