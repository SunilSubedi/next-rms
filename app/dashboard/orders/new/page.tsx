
import React from 'react'

import { getAllFoods } from '@/app/actions/addFood';
import OrderC from '@/app/component/OrderC';

export default  async function Page() {
 
    const foodData = await getAllFoods()
 

  return (
    <div>
      <OrderC data= {foodData}/>
    </div>
  );
}
