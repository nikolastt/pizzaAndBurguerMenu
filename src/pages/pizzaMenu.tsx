import { GetStaticProps } from "next";
import React from "react";
import { getPizzas, IPizza } from "../assets/functionsDataBase";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface IPizzaMenu {
  pizzas: string;
}

const PizzaMenu: React.FC<IPizzaMenu> = ({ pizzas }) => {
  const arrayPizzas: IPizza[] = JSON.parse(pizzas);

  return (
    <div>
      <Header title="Pizz" />
      <div className="px-3 space-y-6 mb-28 md:px-6 space-y-9">
        {arrayPizzas.map((pizza, i) => (
          <CardItem
            key={pizza.name}
            pizza={pizza}
            reverse={i % 2 === 0 ? false : true}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PizzaMenu;

export const getStaticProps: GetStaticProps = async () => {
  const arrayPizzas = await getPizzas();
  const pizzas = JSON.stringify(arrayPizzas);

  return {
    props: {
      pizzas,
    },
  };
};
