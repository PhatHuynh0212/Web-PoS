"use client";
import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";


import { Customer } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CellActions from "./cell-actions";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: () => {
      return null;
    },
  },
  {
    id: 'index',
    header: 'No.',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return <div className="">{row.original.phone}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <CellActions rowData={row.original} />;
    },
  },
];
