"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboradColumn } from "./Columns";
import { CustomTable } from "@/components/Custom-table";
import { columns } from "./Columns";

const BillboardClient = ({ billboards }: { billboards: BillboradColumn[] }) => {

  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store "
        />
        <Button
          onClick={() =>
            router.push(`/store/${params.storeName}/billboards/new`)
          }
        >
          <Plus />
          Add New
        </Button>
      </div>
      <Separator className="my-5" />
      <CustomTable searchKey="label" columns={columns} data={billboards} />
    </>
  );
};

export default BillboardClient;
