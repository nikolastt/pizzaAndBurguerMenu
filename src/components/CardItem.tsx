import React from "react";
import { IPizza } from "../assets/functionsDataBase";

interface ICardItem {
  reverse?: boolean;
  pizza: IPizza;
}

const truncate = (string: string, number: number) => {
  return string?.length > number
    ? string.substring(0, number - 1) + "..."
    : string;
};

const CardItem: React.FC<ICardItem> = ({ reverse, pizza }) => {
  return (
    <div className="bg-white/5 p-5 rounded-xl shadow-xl hover:scale-105 duration-300 cursor-pointer">
      <div
        className={`flex  ${reverse && "flex-row-reverse"}  justify-between`}
      >
        <div className={` w-2/3 pr-6 ${reverse && "pr-0 pl-6 "} `}>
          <div className="border-t pt-3 h-full">
            <h1 className="font-['Teko'] text-4xl text-primary-500 ">
              {pizza.name}
            </h1>
            <p>{truncate(pizza.ingredients, 100)}</p>
          </div>
        </div>

        <div className=" w-1/3 overflow-hidden  flex justify-center items-center">
          <img
            src={pizza.img}
            alt="Image product"
            className="w-28 h-28 rounded-full object-cover mx-auto"
          />
        </div>
      </div>

      <div className="pt-6">
        <p
          className={`     ${
            reverse && "!justify-start"
          } justify-end flex items-center`}
        >
          A partir de:{" "}
          <span className="text-primary-500 font-bold ml-2">R$: 36,00</span>
        </p>
      </div>
    </div>
  );
};

export default CardItem;
