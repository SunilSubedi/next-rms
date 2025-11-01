import { OrderState, OrderAction } from "@/types/orderTypes";

 export const initialstate: OrderState = {
    items:[],
    total:0
}



export function orderReducer(state: OrderState, action: OrderAction)
{
    switch(action.type)
    {
        case "ADD_ITEM": {

            const existing = state.items.find( i => i.id === action.payload.id);

            if (existing) {
                 const updatedItems = state.items.map( i => 
                    i.id === action.payload.id ? { ...i, quantity: i.quantity +  action.payload.quantity } : i
                 );

                 return{
                    items: updatedItems,
                    total: state.total + action.payload.price * action.payload.quantity,
                 };
            }

            return {
                items: [...state.items, action.payload],
                total: state.total + action.payload.price * action.payload.quantity,

            };
        }
        case "CLEAR":
            {
                return{
                    ...state, items:[], total:0
                }
            }
        // case "REMOVE_ITEM":
        //     console.log("Item deleted", state.total)
        //     return {
                
        //     }
        // case "UPDATE_QUANTITY":
        //     console.log("Items Updated")
        //     return state;
        // case "clear":
           
        //     console.log("Item Clear")
        //     return{
        //         total: 0
        //     }
        default:
            return state

    }

}
