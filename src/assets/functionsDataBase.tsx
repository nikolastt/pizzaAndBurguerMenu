import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { IPizza } from "./interfaces";

export const getPizzas = async () => {
  const arrayPizzas: IPizza[] = [];
  const responsePizzas = await getDocs(collection(db, "pizzas"));

  responsePizzas.forEach((pizza) => {
    arrayPizzas.push({ ...pizza.data(), id: pizza.id } as IPizza);
  });

  return arrayPizzas;
};

export const getHamburguers = async () => {
  const arrayHamburguers: IPizza[] = [];
  const responseHamburguers = await getDocs(collection(db, "hamburguers"));

  responseHamburguers.forEach((pizza) => {
    arrayHamburguers.push({ ...pizza.data(), id: pizza.id } as IPizza);
  });

  return arrayHamburguers;
};

export const getProduct = async (typeProduct: string, id: string) => {
  const productResponse = await getDoc(doc(db, typeProduct, id));
  const product = { ...productResponse.data(), id: productResponse.id };
  return product;
};

export const rateProduct = async (
  typeProduct: string,
  idProduct: string,
  rate: number
) => {
  const rateProductRef = doc(db, typeProduct, idProduct);
  await updateDoc(rateProductRef, {
    "rate.qnt": increment(1),
    "rate.rate": increment(rate),
  });
};
