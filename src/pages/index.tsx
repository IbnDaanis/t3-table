import { Manrope } from "next/font/google";
import Head from "next/head";
import { TransactionsTable } from "../components/TransactionsTable";

const manrope = Manrope({
  variable: "--manrope-font",
  subsets: ["latin"],
  display: "fallback"
});

const Home = () => {
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
      <main className={`${manrope.className} h-screen bg-[#0a0a0a]`}>
        <TransactionsTable />
      </main>
    </>
  );
};

export default Home;
