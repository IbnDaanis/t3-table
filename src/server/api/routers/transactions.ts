import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const transactionsRouter = createTRPCRouter({
  // Retrieves all `Transactions` from the table.
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.operatorTransaction.findMany();
  })
});
