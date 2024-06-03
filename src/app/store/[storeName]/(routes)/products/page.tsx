import Container from "@/components/Container";
import React from "react";
import ProductsClient from "./_components/ProductsClient";
import { db } from "../../../../../../prisma/client";
import { ProductsColumn } from "./_components/Columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

export const revalidate = 0 
const page = async ({ params }: { params: { storeName: string } }) => {

  const products = await db.product.findMany({
    where: {
      storeName: params.storeName,
    },
    include:{
      category:true,
      size:true,
      color:true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductsColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    size: item.size.name,
    color: item.color.value,
    category: item.category.name,
    createdAt: format(item.createdAt,"MMMM do,yyyy"),
  }));

  return (
    <Container className="mt-10">
      <ProductsClient products={formattedProducts} />
    </Container>
  );
};

export default page;
