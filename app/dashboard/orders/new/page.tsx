
import React from 'react'

import { getAllFoods } from '@/app/actions/addFood';
import OrderC from '@/app/component/OrderC';
import { Food } from '@prisma/client';

export default  async function Page() {
 
    const foodData = await getAllFoods()
    console.log(foodData)
 

  return (
    <div>
      <OrderC data= {foodData}/>
    </div>
  );
}
