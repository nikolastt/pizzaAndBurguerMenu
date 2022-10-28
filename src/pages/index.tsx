import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import HamburguerMenu from "../components/HamburguerMenu";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-900 h-screen">
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Menu" />

      <div>
        <h1 className="text-center font-['Teko'] text-primary-500 text-6xl">
          MAIS AVALIADOS
        </h1>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
