// "use client"

// import React from 'react'
// import { useReducer } from 'react'
// import { orderReducer, initialstate } from '@/reducer/orderItemsReducer' 

// export default function page() {
//     const [state, dispatch] = useReducer(orderReducer,initialstate);

//     const handleAdd = () => {
//         dispatch({ type:'ADD_ITEM', payload:initialstate.total})
//     }

//     const handleRemove = () => {
//         dispatch({ type:'REMOVE_ITEM', payload:initialstate.total})
//     }

//     const handleClear = () => {
//         dispatch({type:"clear"})
//     }

//   return (
//     <div>
//        <div className='p-4'><button onClick={handleAdd}> + </button></div>
//        <div className='p-4'><button onClick={handleRemove}> - </button></div>
//        <div className='p-4'><button onClick={handleClear}> X </button></div>

//         <p className=' text-2xl'>{state.total}</p>
//     </div>
//   )
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
