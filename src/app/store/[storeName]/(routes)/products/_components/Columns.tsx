"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
export type ProductsColumn = {
  id: string,
  name: string,
  price: string,
  size:string,
  color:string,
  category:string,
  isFeatured: boolean,
  isArchived: boolean,
  createdAt: string;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell:({row})=>{
      const isFeatured = row.original.isFeatured
      if(isFeatured){
        return <Check className="text-green-500 ml-3" />
      }else{
        return  <X className="text-red-500 ml-3" />
      }
    }
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
    cell:({row})=>{
      const isArchived = row.original.isArchived
      if(isArchived){
        return <Check className="text-green-500 ml-3" />
      }else{
        return  <X className="text-red-500 ml-3" />
      }
    }
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell:({row})=>{
      const color = row.original.color
      return (
        <div className="flex items-center gap-2">
          <span>{color}</span>
          <div className="h-6 w-6 rounded-full border" style={{backgroundColor: color}} />
        </div>
      )
    }
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const {id} = row.original;
      return <CellActions id={id} />
    },
  },
];
