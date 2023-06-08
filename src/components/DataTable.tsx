import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type SortingState
} from "@tanstack/react-table";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "~/components/ui/table";
import { Input } from "./ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  filter?: keyof TData;
  filterPlaceholder?: string;
  filterFunctions?: Record<string, FilterFn<TData>> | undefined;
}

/**
 * Standard reusable table for datasets.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  filter,
  filterPlaceholder,
  filterFunctions
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const loadingSkeletons = Array.from(Array(12));

  const table = useReactTable({
    data: isLoading ? loadingSkeletons : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: filterFunctions || {},
    state: {
      sorting,
      columnFilters
    }
  });

  return (
    <div className="flex w-full flex-col">
      {filter && (
        <div className="flex items-center py-4">
          <Input
            placeholder={filterPlaceholder || "Filter..."}
            value={
              (table.getColumn(filter as string)?.getFilterValue() as string) ??
              ""
            }
            onChange={event =>
              table
                .getColumn(filter as string)
                ?.setFilterValue(event.target.value.trim())
            }
            className="max-w-sm"
          />
        </div>
      )}
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
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
          <TableBody className="min-h-[600px]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell key={cell.id}>
                        {isLoading ? (
                          <div
                            key={cell.id}
                            className={`h-4 animate-pulse rounded bg-slate-800`}
                          ></div>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    );
                  })}
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
    </div>
  );
}
