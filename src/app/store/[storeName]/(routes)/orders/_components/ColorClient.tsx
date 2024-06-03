"use client";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { OrderColumns } from "./Columns";
import { CustomTable } from "@/components/Custom-table";
import { columns } from "./Columns";

const ColorClient = ({ data }: { data: OrderColumns[] }) => {
  return (
    <>
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders for your store "
        />
      <Separator className="my-5" />
      <CustomTable searchKey="products" columns={columns} data={data} />
    </>
  );
};

export default ColorClient;
