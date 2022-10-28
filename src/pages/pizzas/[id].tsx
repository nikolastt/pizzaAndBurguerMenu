import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { rateProduct } from "../../assets/functionsDataBase";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { db } from "../../services/firebase";

import StarRatings from "react-star-ratings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IPizza } from "../../assets/interfaces";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IPizzas {
  pizzaData: string;
}

const Pizzas: React.FC<IPizzas> = ({ pizzaData }) => {
  const [rate, setRate] = useState(0);
  const [canRate, setCanRate] = useState(true);

  const pizza = JSON.parse(pizzaData) as IPizza;
  const router = useRouter();
  const evaluation = (pizza.rate?.rate as number) / (pizza.rate?.qnt as number);

  const handleRated = async (rate: number) => {
    try {
      if (canRate) {
        setRate(rate);
        await rateProduct("pizzas", pizza.id, rate);
        notifySuccess("Obrigado pela sua avaliação!");
        setCanRate(false);
      } else {
        notifyError("Você já avaliou este pedido!");
      }

      setTimeout(() => {
        setCanRate(true);
      }, 1000 * 60 * 3);
    } catch {}
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyError = (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="">
      <Header title={pizza.name} />
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mt-6">
          <img src={pizza.img} alt="" className="w-48 h-48 rounded-full" />
        </div>

        <div className="mx-6 mt-6">
          <h1 className="text-primary-500 font-['Teko'] text-5xl  pt-3 ">
            <span className="flex justify-between">{pizza.name}</span>
          </h1>
          <div className="flex items-center">
            <StarRatings
              rating={evaluation || 0}
              starRatedColor="#cacaca"
              starEmptyColor="#464646"
              starDimension="15px"
              starSpacing="3px"
              numberOfStars={5}
            />
            <span className="text-sm text-white ml-2 mt-1">
              ( {pizza.rate?.qnt || 0} )
            </span>
          </div>

          <p className="text-lg font-thin mt-6">{pizza.ingredients}</p>

          <div className="flex flex-col my-12 ">
            <h1 className="font-['Teko'] text-primary-500 text-4xl">
              Preços :{" "}
            </h1>

            <div className="flex justify-between my-3">
              <p className="font-thin">
                M:{" "}
                <span className="text-primary-500 font-bold">
                  {pizza.amountM}
                </span>
              </p>

              <p>
                G:{" "}
                <span className="text-primary-500 font-bold">
                  {pizza.amountG}
                </span>
              </p>

              <p>
                GG:{" "}
                <span className="text-primary-500 font-bold">
                  {pizza.amountGG}
                </span>
              </p>

              <p>
                ExG:{" "}
                <span className="text-primary-500 font-bold">
                  {pizza.amountExG}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mb-36">
          <h1 className="font-['Teko'] text-primary-500 text-4xl">
            Avalie este sabor
          </h1>

          <div className=" w-full flex justify-center mt-3 ">
            <StarRatings
              rating={rate}
              starRatedColor="#f1d045"
              starHoverColor="yellow"
              starDimension="35px"
              starSpacing="10px"
              changeRating={handleRated}
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
  const pizza = { ...pizzaResponse.data(), id: pizzaResponse.id };
  const pizzaData = JSON.stringify(pizza);

  return {
    props: {
      pizzaData,
    },
    revalidate: 60 * 60 * 6,
  };
};
