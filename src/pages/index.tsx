import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper";
import {
  getMostAvaliableHamburguers,
  getMostAvaliablePizzas,
} from "../assets/functionsDataBase";
import { IHamburguer, IPizza } from "../assets/interfaces";
import CardItemSwiper from "../components/CardItemSwiper";
import Link from "next/link";

interface IHome {
  arrayPizzas: string;
  arrayHamburguers: string;
}

const Home: NextPage<IHome> = ({ arrayHamburguers, arrayPizzas }) => {
  const pizzas = JSON.parse(arrayPizzas) as IPizza[];
  const hamburguers = JSON.parse(arrayHamburguers) as IHamburguer[];

  return (
    <div className="bg-gray-900 h-screen">
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Menu" />

      <div className="mt-24">
        <h1 className="text-center font-['Teko'] text-primary-500 text-6xl">
          MAIS AVALIADOS
        </h1>

        <div className="px-3 mt-6">
          <Swiper
            effect={"flip"}
            grabCursor={true}
            pagination={true}
            navigation={true}
            modules={[EffectFlip, Pagination, Navigation]}
            className="mySwiper"
          >
            {pizzas.map((pizza) => (
              <SwiperSlide key={pizza.name}>
                <Link href={`/pizzas/${pizza.id}`}>
                  <a>
                    <CardItemSwiper
                      img={pizza.img}
                      name={pizza.name}
                      price={pizza.amountM}
                      typeProduct="pizza"
                    />
                  </a>
                </Link>
              </SwiperSlide>
            ))}
            {hamburguers.map((hamburguer) => (
              <SwiperSlide key={hamburguer.name}>
                <CardItemSwiper
                  img={hamburguer.img}
                  name={hamburguer.name}
                  price={hamburguer.amountHamburguer}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const arrayMostAvaliablePizzas = await getMostAvaliablePizzas();
  const arrayPizzas = JSON.stringify(arrayMostAvaliablePizzas);
  const arrayMostAvaliableHamburguers = await getMostAvaliableHamburguers();
  const arrayHamburguers = JSON.stringify(arrayMostAvaliableHamburguers);

  return {
    props: {
      arrayPizzas,
      arrayHamburguers,
    },
  };
};
