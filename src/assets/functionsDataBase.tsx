import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export interface IPizza {
  amountExG: string;
  amountG: string;
  amountGG: string;
  amountM: string;
  img: string;
  ingredients: string;
  name: string;
}

export const getPizzas = async () => {
  const arrayPizzas: IPizza[] = [];
  const responsePizzas = await getDocs(collection(db, "pizzas"));

  responsePizzas.forEach((pizza) => {
    arrayPizzas.push(pizza.data() as IPizza);
  });

  return arrayPizzas;
};