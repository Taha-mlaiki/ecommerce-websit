"use client";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { CategoriesColumn } from "./Columns";
import { CustomTable } from "@/components/Custom-table";
import { columns } from "./Columns";

const CategoryClient = ({ data }: { data: CategoriesColumn[] }) => {

  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store "
        />
        <Button
          onClick={() =>
            router.push(`/store/${params.storeName}/categories/new`)
          }
        >
          <Plus />
          Add New
        </Button>
      </div>
      <Separator className="my-5" />
      <CustomTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default CategoryClient;
