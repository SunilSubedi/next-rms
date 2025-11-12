
"use server"
import { OrderInput,OrderView } from "@/types/orderTypes";
import { db } from "@/lib/db"
import { ca } from "zod/locales";
import { custom } from "zod";
import { table } from "console";
import { create } from "domain";



export async function addOrder(orderData: OrderInput): Promise<boolean>
{
    if(!orderData) return false;

    const { customerName, tableId, totalAmount, orderItems } = orderData;
    
    try{
        let customer = await db.customer.findFirst({
            where: { name: customerName }
        });

        if (!customer) {
             customer = await db.customer.create({
                data: { name: customerName }
            }); 
        }

        const order = await db.order.create({
            data: {
                customerId: customer.id,
                tableId: tableId,
                totalAmount: totalAmount,
                orderItems: {
                    create: orderItems.map((item) => ({
                        foodId: item.foodId,
                        quantity: item.quantity,
                        subtotal: item.subtotal,
                    })),
                },
            },
            include: {
                orderItems: true,
                table: true,
                customer: true,
            }
        });

        if(tableId)
        {
            try
            {
            await db.table.update({
                where:{ id: tableId },
                data:{ status: 'OCCUPIED' }
            })
          }catch(error)
          {
            console.log('Error updating table status:', error)
          }

        }
        console.log('Order created successfully:', order)
        return true;

        
    }catch(error)
    {
        console.log('Error creating order:', error)
        return false;
    }

   
}

export async function fetchOrders(): Promise<OrderView[]>
{

    try{
        const orders = await db.order.findMany({
            include:{
                orderItems: {include:{ food: true }},
                customer: true,
                table: true,
            },
            orderBy:{
                createdAt: 'desc',
            }
        });

        return orders.map(order => ({
            id: order.id,
            customerName: order.customer.name,
            tableNumber: order.table ? order.table.number : null,
            totalAmount: order.totalAmount,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            orderItems: order.orderItems.map(item => ({
                id: item.id,
                orderId: item.orderId,
                itemName: item.food.name,
                quantity: item.quantity,
                subtotal: item.subtotal,
               
            })),
        }));

    }catch(error)
    {
        console.log('Error fetching orders:', error)
        return [];
    }   

}