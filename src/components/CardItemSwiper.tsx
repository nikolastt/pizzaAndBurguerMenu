import Link from "next/link";
import React from "react";

interface ICardItemSwiper {
  img: string;
  name: string;
  price: string;
  typeProduct?: string;
}

const CardItemSwiper: React.FC<ICardItemSwiper> = ({
  img,
  name,
  price,
  typeProduct,
}) => {
  return (
    <div className="bg-[#030612] shadow  w-[85%] mx-auto mb-10 rounded-3xl p-6 cursor-pointer">
      <img src={img} alt={name} className="w-36 h-36 rounded-full mx-auto" />

      <div>
        <h1 className=" font-['Teko'] text-3xl text-center mt-6">{name}</h1>

        <p className="mt-3">
          {typeProduct === "pizza" && "A partir de: "}{" "}
          <span className="text-primary-500 font-bold">R$: {price}</span>
        </p>

        <div className="w-full flex justify-center ">
          <button className="flex justify-center hover:scale-105 duration-300 w-[75%] bg-primary-500 px-6 py-2 rounded-full mt-5">
            Clique e saiba mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItemSwiper;
