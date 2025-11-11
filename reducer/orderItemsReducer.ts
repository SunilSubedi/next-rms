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
        case "REMOVE_ITEM":
            {
                 const updatedItems = state.items.filter( item => item.id !== action.payload)
                 const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price, 0)

                 return{
                    ...state,
                    items: updatedItems,
                    total: updatedTotal

                 };
            }
       
       case "UPDATE_QUANTITY":
        {
             const updatedItems = state.items.map( item  =>{
                 if(item.id == action.payload.id)
                 {
                    return{
                        ...item,
                        quantity: item.quantity - action.payload.quantity
                    };
                }
                return item;
        });
         
            const filterItems = updatedItems.filter( item => item.quantity >= 1)
            const updatedTotal = filterItems.reduce((sum, item) => sum + item.price, 0)

            return{
                ...state,
                items: filterItems,
                total: updatedTotal
            }


        }


        
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
