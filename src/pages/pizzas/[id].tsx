import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { IPizza } from "../../assets/functionsDataBase";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { db } from "../../services/firebase";

// import { Container } from './styles';

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IPizzas {
  pizza: string;
}

const Pizzas: React.FC<IPizzas> = ({ pizza }) => {
  const pizzaData = JSON.parse(pizza) as IPizza;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header title={pizzaData.name} />
      <h1>Nome: {pizzaData.name} </h1>

      <Footer />
    </div>
  );
};

export default Pizzas;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const pizzaResponse = await getDoc(doc(db, "pizzas", id));
  const pizza = JSON.stringify(pizzaResponse.data());

  return {
    props: {
      pizza,
    },
  };
};
