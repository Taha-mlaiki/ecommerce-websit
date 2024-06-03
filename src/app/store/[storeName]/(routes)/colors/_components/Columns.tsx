"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";


export type colorsColumn = {
  id: string;
  name: string;
  value:string;
  createdAt: string;
};

export const columns: ColumnDef<colorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell:({row})=> (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.value}} />
      </div>
    )
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
