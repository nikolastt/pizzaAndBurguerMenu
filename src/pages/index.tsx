import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import HamburguerMenu from "../components/HamburguerMenu";
import Header from "../components/Header";

// import Bg from "../../public/images/bg.jpg";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-900 h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="h-screen w-full bg-bg bg-no-repeat bg-cover ">
        <div className="w-full h-full bg-black/70 backdrop-blur-sm"></div>
      </div> */}

      <section id="hamburguer">
        <Header title="Hambúrgueri" />
        <HamburguerMenu />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;