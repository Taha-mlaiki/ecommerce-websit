"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";


export type BillboradColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboradColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original.id
      return <CellActions id={id} />
    },
  },
];
