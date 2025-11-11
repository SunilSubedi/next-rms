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
| { type: 'CREATE_ORDER'; payload:{data: OrderState; cus_name: string, table_number: number}}
| { type: 'CLEAR'}


export interface OrderInput
{   customerName: string;
     tableId: string;
     totalAmount: number;
     orderItems: {
          foodId: string;
          quantity: number;
          subtotal: number;
     }[];

}

// ...existing code...

export interface OrderItemView {
  id: string;
  orderId: string;
  itemName: string;
  quantity: number;
  subtotal: number;
}

export interface OrderView {
  id: string;
  customerName: string;
  tableNumber: number | null;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: OrderItemView[];
}