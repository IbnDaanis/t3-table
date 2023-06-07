import { Manrope } from "next/font/google";
import Head from "next/head";
import { api } from "~/utils/api";

const manrope = Manrope({
  variable: "--manrope-font",
  subsets: ["latin"],
  display: "fallback"
});

const Home = () => {
  const { data: transactions } = api.transactionsRouter.getAll.useQuery();

  console.log(transactions);

  return (
    <>
      <Head>
        <title>Ethereum Node Operator Earnings and Costs</title>
        <meta
          name="description"
          content="Tracking the earnings and costs of Ethereum Node Operators."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${manrope.className} flex min-h-screen flex-col items-center justify-center `}
      >
        {transactions?.map(transaction => {
          return <div key={transaction.id}>{transaction.gasCosts}</div>;
        })}
      </main>
    </>
  );
};

export default Home;
