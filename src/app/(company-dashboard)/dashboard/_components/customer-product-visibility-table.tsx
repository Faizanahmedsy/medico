"use client";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import useGlobalState from "@/store";
import { DashHeader } from "@/components/modules";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    degree: "MBBS",
    name: "Example",
    state: "Gujarat",
    district: "Kutch",
    taluka: "Bhuj",
  },
  {
    id: "3u1reuv4",
    degree: "MBBS",
    name: "Example 2",
    state: "Gujarat",
    district: "Kutch",
    taluka: "Bhuj",
  },
  {
    id: "derv1ws0",
    degree: "MBBS",
    name: "Example 3",
    state: "Gujarat",
    district: "Kutch",
    taluka: "Bhuj",
  },
  {
    id: "5kma53ae",
    degree: "MBBS",
    name: "Example 4",
    state: "Gujarat",
    district: "Kutch",
    taluka: "Bhuj",
  },
  {
    id: "bhqecj4p",
    degree: "MBBS",
    name: "Example 5",
    state: "Gujarat",
    district: "Kutch",
    taluka: "Bhuj",
  },
];

export type Payment = {
  id: string;
  degree: string;
  name: string;
  state: string;
  district: string;
  taluka: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "district",
    header: "District",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("district")}</div>
    ),
  },
  {
    accessorKey: "taluka",
    header: "Taluka",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("taluka")}</div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        // <Button
        //   variant="ghost"
        //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        // >
        <div>State</div>
        //   <CaretSortIcon className="ml-2 h-4 w-4" />
        // </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("state")}</div>,
  },
  {
    accessorKey: "degree",
    // header: () => <div className="text-right">Degree</div>,
    header: "Degree",
    cell: ({ row }) => <div className="">{row.getValue("degree")}</div>,

    // cell: ({ row }) => {
    //   // const degree = parseFloat(row.getValue("degree"));

    //   // // Format the degree as a dollar degree
    //   // const formatted = new Intl.NumberFormat("en-US", {
    //   //   style: "currency",
    //   //   currency: "USD",
    //   // }).format(degree);

    //   // return <div className="text-right font-medium">{formatted}</div>;

    //   return <div>{row.getValue("degree")}</div>;
    // },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CustomerProductVisibilityTable({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const selectedBuyers = useGlobalState((state) => state.selectedBuyers);

  console.log("selectedBuyers", selectedBuyers);

  const saveSelectedBuyers = useGlobalState(
    (state) => state.saveSelectedBuyers
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const formateSelectedArray = (selectedArray: any) => {
    return selectedArray.map((item: any) => item.original);
  };

  const selectedArray = formateSelectedArray(
    table.getFilteredSelectedRowModel().rows
  );

  console.log("selectedArray", selectedArray);

  const saveSelectedBuyersArr = () => {
    saveSelectedBuyers(selectedArray);
  };

  // setSelectedBuyers(
  //   formateSelectedArray(table.getFilteredSelectedRowModel().rows)
  // );

  // useEffect(() => {
  //   setSelectedBuyers(selectedArray);
  // }, []);

  // console.log("selectedBuyers", selectedBuyers);
  // // useEffect(() => {
  //   console.log("selectedArray", selectedArray);

  //   setSelectedBuyers(selectedArray);
  // }, [selectedArray]);

  const selectedBuyerIds = selectedArray.map((item: any) => item.id);

  console.log("selectedBuyerIds", selectedBuyerIds);
  console.log("selectedArray", selectedArray);

  return (
    <>
      <DashHeader
        title={"Whom to show this product to?"}
        button={
          <Button
            variant={"company"}
            onClick={() => {
              saveSelectedBuyersArr();
              setStep((prev) => prev + 1);
            }}
          >
            SAVE AND CONTINUE
          </Button>
        }
      />

      <div className="w-full">
        <div className="flex items-center justify-end py-4">
          <Input
            placeholder="Search"
            value={(table.getColumn("state")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("state")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
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
                      <TableCell key={cell.id}>
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
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
    </>
  );
}
