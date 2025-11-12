
import React from 'react'

import { getAllFoods } from '@/app/actions/addFood';
import OrderC from '@/app/component/OrderC';
import { OrderState } from '@/types/orderTypes';
import { getTables } from '@/app/actions/tableActions';
import { addOrder } from '@/app/actions/orderAction';
import { OrderInput } from '@/types/orderTypes';
import { ca, tr } from 'zod/locales';

export default  async function Page() {
 
    const foodData = await getAllFoods()
    const tableData = await getTables()



  
 

  return (
    <div>
      <OrderC data= {foodData} tables= { tableData} createOrder = {addOrder} />
    </div>
  );
}
