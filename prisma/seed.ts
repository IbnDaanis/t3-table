import { prisma } from "../src/server/db";
import data from "./data.json";

interface Transaction {
  timeUnit: string;
  usdEarned: number;
  gasCosts: number;
}

const dummyData: Transaction[] = data;

async function main() {
  await prisma.operatorTransaction.createMany({
    data: dummyData
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
