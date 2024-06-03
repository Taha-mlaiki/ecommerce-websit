"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";


export type CategoriesColumn = {
  id: string;
  name: string;
  billboardLabel:string
  createdAt: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const { id } = row.original;
      return <CellActions id={id} />
    },
  },
];
