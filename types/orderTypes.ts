import { FoodData } from "./foodTypes"


export interface OrderItem extends FoodData
{
     quantity:number | 1
}


export interface OrderState {
     items: OrderItem[];
     total: number;
}


export type OrderAction = 
| { type: 'ADD_ITEM'; payload: OrderItem}
| { type:'REMOVE_ITEM'; payload:string}
| { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity:number} }
| { type: 'CLEAR'}

