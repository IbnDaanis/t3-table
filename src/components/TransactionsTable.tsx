import { type OperatorTransaction } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { api } from "~/utils/api";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

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
      return <>{dayjs(timeUnit).format("MMMM YYYY")}</>;
    }
  },
  {
    accessorKey: "usdEarned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          USD Earned
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: data => {
      const gasCosts = data.getValue<Date>();
      return <>{gasCosts.toLocaleString("en-US")}</>;
    }
  },
  {
    accessorKey: "gasCosts",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gas Costs
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: data => {
      const gasCosts = data.getValue<Date>();
      return <>{gasCosts.toLocaleString("en-US")}</>;
    }
  }
];

/**
 * Table displaying the transactions.
 */
export const TransactionsTable = () => {
  const { data: transactions } = api.transactionsRouter.getAll.useQuery();

  return (
    <div className="container flex h-full flex-col items-center justify-center">
      <h2 className="mb-12 text-5xl font-bold">Monthly Transactions</h2>
      <div className="flex w-full max-w-[800px] cursor-pointer items-center justify-center">
        <DataTable columns={columns} data={transactions || []} />
      </div>
    </div>
  );
};
