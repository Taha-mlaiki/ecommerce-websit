import Container from "@/components/Container";
import React from "react";
import ColorClient from "./_components/ColorClient";
import { db } from "../../../../../../prisma/client";
import { colorsColumn } from "./_components/Columns";
import { format } from "date-fns";
export const revalidate = 0 
const page = async ({ params }: { params: { storeName: string } }) => {

  const sizes = await db.color.findMany({
    where: {
      storeName: params.storeName,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: colorsColumn[] = sizes.map((bill) => ({
    id: bill.id,
    name: bill.name,
    value:bill.value,
    createdAt: format(bill.createdAt,"MMMM do,yyyy"),
  }));

  return (
    <Container className="mt-10">
      <ColorClient data={formattedColors} />
    </Container>
  );
};

export default page;
