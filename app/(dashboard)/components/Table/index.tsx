"use client";

import React from "react";
import Image from "next/image";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Schema } from "@/backend/amplify/data/resource";
import { useRouter } from "next/navigation";
import { StorageImage } from "@aws-amplify/ui-react-storage";

interface Itinerary {
  id: string;
  image: string;
  title: string;
  description: string;
  location: string;
  people: number;
  price: number;
  isDynamic: boolean;
  itineraryType: string;
}

interface ItineraryTableProps {
  itineraries: Schema["Itinerary"]["type"][];
}

export default function ItineraryTable({ itineraries }: ItineraryTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const router = useRouter();
  const formattedItineraries: Itinerary[] = itineraries.map((itinerary) => {
    return {
      id: itinerary.id,
      image: "/placeholder.svg?height=100&width=100",
      title: itinerary.itineraryTitle,
      description: "Discover the hidden gems of the city",
      location: "New York, NY",
      people: 3,
      price: 2,
      isDynamic: itinerary.isDynamic,
      itineraryType: itinerary.itineraryType,
    };
  });

  const columns: ColumnDef<Itinerary>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return row.original.isDynamic ? (
          <StorageImage
            alt="cat"
            path={`dynamic_pictures/${row.original.itineraryType}.webp`}
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
        ) : (
          <Image
            src={row.original.image}
            alt={row.original.title}
            width={100}
            height={100}
            className="rounded-md object-cover"
          />
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "people",
      header: "People",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
    },
  ];

  const table = useReactTable({
    data: formattedItineraries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <Input
          placeholder="Search itineraries..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUp className="ml-2 h-4 w-4 inline" />,
                            desc: (
                              <ChevronDown className="ml-2 h-4 w-4 inline" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      onClick={() => {
                        const url = cell.row.original.isDynamic
                          ? "/details/dynamic"
                          : "/details/custom";
                        router.push(`${url}/${cell.row.original.id}`);
                      }}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
