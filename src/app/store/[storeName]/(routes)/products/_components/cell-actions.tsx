"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import DeleteAlert from "../[productId]/_components/DeleteAlert";
import { useParams, useRouter } from "next/navigation";

const cellActions = ({ id }: { id: string | unknown }) => {

    const router = useRouter()
    const params = useParams()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <MoreHorizontal className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <Button onClick={()=> router.push(`products/${id}`)} variant="ghost" className="gap-2 items-center">
          <Pencil className="w-5 h-5 -ms-4" />
          Edit
        </Button>
        <DeleteAlert className="w-full gap-2" id={id}>
          <Trash className="w-5 h-5 -ms-4" />
          Delete
        </DeleteAlert>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default cellActions;
