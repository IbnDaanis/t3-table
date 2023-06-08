import { type OperatorTransaction } from "@prisma/client";
import type { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown } from "lucide-react";
import { api } from "~/utils/api";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";

// Making a custom filter function for dates.
declare module "@tanstack/table-core" {
  interface FilterFns {
    date: FilterFn<unknown>;
  }
}

/**
 * Columns for the transactions table.
 */
const columns: ColumnDef<OperatorTransaction>[] = [
  {
    accessorKey: "timeUnit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Month
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: data => {
      const timeUnit = data.getValue<Date>();
      return <p className="pl-4">{dayjs(timeUnit).format("MMMM YYYY")}</p>;
    },
    filterFn: "date"
  },
  {
    accessorKey: "usdEarned",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="w-fit min-w-[160px]"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            USD Earned ($)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: data => {
      const usdEarned = data.getValue<number>();
      return (
        <p className="text-center">
          {Number(usdEarned.toFixed(2)).toLocaleString("en-us")}
        </p>
      );
    }
  },
  {
    accessorKey: "gasCosts",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            className="w-fit min-w-[160px]"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gas Costs ($)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: data => {
      const gasCosts = data.getValue<number>();
      return (
        <p className="text-center">
          {Number(gasCosts.toFixed(2)).toLocaleString("en-us")}
        </p>
      );
    }
  }
];

/**
 * Since we are formatting the dates to `MONTH YEAR`,
 * we should make a custom filter so users can type
 * in the month and/or year number.
 */
function monthFilter(
  row: Row<OperatorTransaction>,
  key: string,
  filterQuery: string
) {
  const timeUnit = row.getValue<Date>(key);

  return dayjs(timeUnit)
    .format("MMMM YYYY")
    .toLowerCase()
    .includes(filterQuery.trim().toLowerCase());
}

/**
 * Table displaying the transactions.
 */
export const TransactionsTable = () => {
  const { data: transactions, isLoading } =
    api.transactionsRouter.getAll.useQuery();

  console.log(
    "DATA: ",
    transactions?.map(tran => ({
      time: tran.timeUnit,
      usdEarned: tran.usdEarned
    }))
  );
  return (
    <div className="container flex h-full flex-col items-center pt-[10rem]">
      <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
        Monthly Transactions
      </h2>
      <div className="flex w-full max-w-[800px] cursor-pointer items-center justify-center rounded-md bg-[#0a0a0a]">
        <DataTable
          columns={columns}
          data={transactions || []}
          isLoading={isLoading}
          filter="timeUnit"
          filterPlaceholder="Filter by month..."
          filterFunctions={{
            date: monthFilter
          }}
        />
      </div>
    </div>
  );
};
