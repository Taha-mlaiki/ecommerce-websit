import Container from "@/components/Container";
import React from "react";
import ColorClient from "./_components/ColorClient";
import { db } from "../../../../../../prisma/client";
import { OrderColumns } from "./_components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
export const revalidate = 0 
const page = async ({ params }: { params: { storeName: string } }) => {

  const orders = await db.order.findMany({
    where: {
      storeName: params.storeName,
    },
    include:{
      orderItems:{
        include:{
          product:true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumns[] = orders.map((bill) => ({

    id: bill.id,
    phone: bill.phone,
    isPaid:bill.isPaid,
    address:bill.address,
    products: bill.orderItems.map((orederItem)=> orederItem.product.name).join(","),
    totalPrice : formatter.format(bill.orderItems.reduce((total,item)=>{
      return total + item.product.price
    },0)),
    createdAt: format(bill.createdAt,"MMMM do,yyyy"),
  }));

  return (
    <Container className="mt-10">
      <ColorClient data={formattedOrders} />
    </Container>
  );
};

export default page;
