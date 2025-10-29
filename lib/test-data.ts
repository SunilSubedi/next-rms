
interface User {
    name: string;
    email: string;
    role : string;
    age: number;
}

export const columns: {key: keyof User; label:string}[]=[
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "age", label:"Age"},
  ];


export const users: User[] =   [
    { name: "Alice", email: "alice@example.com", role: "Admin", age:20 },
    { name: "Bob", email: "bob@example.com", role: "Customer", age:30 },
    { name: "Charlie", email: "charlie@example.com", role: "Staff",age:40 },
  ];

export const foods = {
     name:"Momo",
     description:"Its a Neplease Dish",
     price:40,
}
