import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import { getProduct, rateProduct } from "../../assets/functionsDataBase";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import StarRatings from "react-star-ratings";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IHamburguer, IPizza } from "../../assets/interfaces";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface IHamburguers {
  hamburguerData: string;
}

const Hamburguer: React.FC<IHamburguers> = ({ hamburguerData }) => {
  const [rate, setRate] = useState(0);
  const [canRate, setCanRate] = useState(true);

  const hamburguer = JSON.parse(hamburguerData) as IHamburguer;
  const router = useRouter();
  const evaluation =
    (hamburguer.rate?.rate as number) / (hamburguer.rate?.qnt as number);

  const handleRated = async (rate: number) => {
    try {
      if (canRate) {
        setRate(rate);
        await rateProduct("hamburguers", hamburguer.id, rate);
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
      <Header title={hamburguer.name} />
      <div>
        <div className="flex justify-center mt-6">
          <img src={hamburguer.img} alt="" className="w-48 h-48 rounded-full" />
        </div>

        <div className="mx-6 mt-6">
          <h1 className="text-primary-500 font-['Teko'] text-5xl  pt-3 ">
            <span className="flex justify-between">
              {hamburguer.name}
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
                  ( {hamburguer.rate?.qnt || 0} )
                </span>
              </div>
            </span>
          </h1>

          <p className="text-lg font-thin mt-6">{hamburguer.ingredients}</p>

          <div className="flex flex-col my-12 ">
            <h1 className="font-['Teko'] text-primary-500 text-4xl">
              R$: {hamburguer.amountHamburguer}{" "}
            </h1>
          </div>
        </div>

        <div className="flex flex-col items-center ">
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

export default Hamburguer;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  const hamburguerResponse = await getProduct("hamburguers", id);
  const hamburguerData = JSON.stringify(hamburguerResponse);

  return {
    props: {
      hamburguerData,
    },
    revalidate: 60 * 60 * 6,
  };
};
