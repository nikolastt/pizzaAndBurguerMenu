import { GetStaticPaths, GetStaticProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { getHamburguers, getPizzas } from "../../assets/functionsDataBase";
import { IHamburguer, IPizza } from "../../assets/interfaces";
import CardItem from "../../components/CardItem";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

interface IMenu {
  data: string;
}

interface IParams extends ParsedUrlQuery {
  typeMenu: string;
}

const Menu: React.FC<IMenu> = ({ data }) => {
  const router = useRouter();
  const path = router.asPath.split("/menu/")[1];

  if (path === "pizzas") {
    const arrayProduct = JSON.parse(data) as IPizza[];
    return (
      <div>
        <Header title={path} />
        <div className="px-3  mb-28 md:px-6 md:space-y-9">
          {arrayProduct.map((product, i) => (
            <Link href={`/${path}/${product.id}`} passHref key={product.name}>
              <a>
                <CardItem
                  reverse={i % 2 === 0 ? false : true}
                  img={product.img}
                  name={product.name}
                  ingredients={product.ingredients}
                  price={product.amountM}
                  typeProduct={path}
                />
              </a>
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    );
  } else {
    const arrayProduct = JSON.parse(data) as IHamburguer[];
    return (
      <div>
        <Header title={path} />
        <div className="px-3  mb-28 md:px-6 md:space-y-9">
          {arrayProduct.map((product, i) => (
            <Link href={`/${path}/${product.id}`} passHref key={product.name}>
              <a>
                <CardItem
                  reverse={i % 2 === 0 ? false : true}
                  img={product.img}
                  name={product.name}
                  ingredients={product.ingredients}
                  price={product.amountHamburguer}
                  typeProduct={path}
                />
              </a>
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
};

export default Menu;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { typeMenu } = context.params as IParams;

  let arrayData;

  if (typeMenu === "pizzas") {
    arrayData = await getPizzas();
  } else if (typeMenu === "hamburguers") {
    arrayData = await getHamburguers();
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const data = JSON.stringify(arrayData);

  return {
    props: {
      data,
    },
  };
};
