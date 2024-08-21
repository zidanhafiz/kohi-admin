"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Admin } from "@/types/admin";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columns: ColumnDef<Admin>[] = [
  {
    id: "number",
    header: "No",
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        {row.getValue("isActive") ? <div className='w-2 h-2 bg-green-500 rounded-full'></div> : <div className='w-2 h-2 bg-gray-300 rounded-full'></div>}
        {row.getValue("isActive") ? "online" : "offline"}
      </div>
    ),
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => <div>{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => <Badge variant={row.getValue("role") === "ADMIN" ? "default" : "outline"}>{row.getValue("role")}</Badge>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const admin = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigator.clipboard.writeText(admin.id ?? "")}>Copy admin ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="cursor-pointer" href={`/admin/cashiers/${admin.id}`}>
                View details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
