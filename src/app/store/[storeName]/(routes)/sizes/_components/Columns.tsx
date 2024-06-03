"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";


export type ZisesColumn = {
  id: string;
  name: string;
  value:string;
  createdAt: string;
};

export const columns: ColumnDef<ZisesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
