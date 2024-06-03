import Container from "@/components/Container";
import React from "react";
import CategoryClient from "./_components/CategoryClient";
import { db } from "../../../../../../prisma/client";
import { CategoriesColumn } from "./_components/Columns";
import { format } from "date-fns";
export const revalidate = 0 

const page = async ({ params }: { params: { storeName: string } }) => {

  const categories = await db.category.findMany({
    where: {
      storeName: params.storeName,
    },
    include:{
      billboard:true
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoriesColumn[] = categories.map((bill) => ({
    id: bill.id,
    name: bill.name,
    billboardLabel : bill.billboard.label,
    createdAt: format(bill.createdAt,"MMMM do,yyyy"),
  }));

  return (
    <Container className="mt-10">
      <CategoryClient data={formattedCategories} />
    </Container>
  );
};

export default page;
