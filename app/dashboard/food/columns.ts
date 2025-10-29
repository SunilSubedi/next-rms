

interface Food {
    id: string;
    name: string;
    description: string | null;
    price: number;
    imageUrl: string | null;
    available: boolean,
    createdAt: Date,
    updatedAt: Date,

}

export const columns:{key: keyof Food; label: string}[] =[
    { key: "name", label:"Name"},
    { key:"description", label:"Description"},
    { key:"price", label:"Price"},
    { key:"imageUrl", label:"Image"},
    { key:"available", label:"Available"},


]