import Container from "@/components/Container";
import React from "react";
import BillboardClient from "./_components/BillboardClient";
import { db } from "../../../../../../prisma/client";
import { BillboradColumn } from "./_components/Columns";
import { format } from "date-fns";
export const revalidate = 0 
const page = async ({ params }: { params: { storeName: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeName: params.storeName,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboradColumn[] = billboards.map((bill) => ({
    id: bill.id,
    label: bill.label,
    createdAt: format(bill.createdAt,"MMMM do,yyyy"),
  }));

  return (
    <Container className="mt-10">
      <BillboardClient billboards={formattedBillboards} />
    </Container>
  );
};

export default page;
