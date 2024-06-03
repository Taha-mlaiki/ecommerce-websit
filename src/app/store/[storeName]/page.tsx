import Heading from '@/components/Heading';
import Container from '@/components/Container';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCardIcon, DollarSign, Package } from 'lucide-react';
import { formatter } from '@/lib/utils';
import { db } from '../../../../prisma/client';
import Overview from './_components/Overview';

export interface GraphData {
  name:string,
  total:number
}

const page = async ({ params }: { params: { storeName: string } }) => {
  const orders = await db.order.findMany({
    where: {
      storeName: params.storeName,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price;
    }, 0);
    return total + orderTotal;
  }, 0);

  const monthlyRevenue: { [key: number]: number } = {};
  for (const order of orders){
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;
    for(const item of order.orderItems){
      revenueForOrder += item.product.price
    }
    monthlyRevenue[month] = (monthlyRevenue[month]|| 0) + revenueForOrder
  }
  const graphData:GraphData[] = [
      {name:"Jan",total:0},
      {name:"Feb",total:0},
      {name:"Mar",total:0},
      {name:"Apr",total:0},
      {name:"May",total:0},
      {name:"Jun",total:0},
      {name:"Jul",total:0},
      {name:"Aug",total:0},
      {name:"Seb",total:0},
      {name:"Oct",total:0},
      {name:"Nov",total:0},
      {name:"Dec",total:0}
  ]
  for (const month in monthlyRevenue){
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
  }

  const productInStock = await db.product.findMany({
    where: {
      isArchived: false,
      storeName: params.storeName,
    },
  });

  return (
    <Container className="mt-10">
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator className="my-5" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatter.format(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Products In Stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productInStock.length}</div>
          </CardContent>
        </Card>
      </div>
      <div className='w-full mt-20'>
          <Overview data={graphData} />
      </div>
    </Container>
  );
};

export default page;
