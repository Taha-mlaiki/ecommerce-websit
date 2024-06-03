import Container from "@/components/Container";
import React from "react";
import SizeClient from "./_components/SizeClient";
import { db } from "../../../../../../prisma/client";
import { ZisesColumn } from "./_components/Columns";
import { format } from "date-fns";
export const revalidate = 0 
const page = async ({ params }: { params: { storeName: string } }) => {

  const sizes = await db.size.findMany({
    where: {
      storeName: params.storeName,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: ZisesColumn[] = sizes.map((bill) => ({
    id: bill.id,
    name: bill.name,
    value:bill.value,
    createdAt: format(bill.createdAt,"MMMM do,yyyy"),
  }));

  return (
    <Container className="mt-10">
      <SizeClient data={formattedSizes} />
    </Container>
  );
};

export default page;
