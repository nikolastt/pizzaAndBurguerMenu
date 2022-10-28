import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
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

export const getMostAvaliablePizzas = async () => {
  const arrayMostAvaliableProducts: IPizza[] = [];
  const q = query(collection(db, "pizzas"), orderBy("rate.rate"), limit(2));
  const result = await getDocs(q);
  result.forEach((result) => {
    arrayMostAvaliableProducts.push({
      ...result.data(),
      id: result.id,
    } as IPizza);
  });
  return arrayMostAvaliableProducts;
};

export const getMostAvaliableHamburguers = async () => {
  const arrayMostAvaliableProducts: IPizza[] = [];
  const q = query(
    collection(db, "hamburguers"),
    orderBy("rate.rate"),
    limit(2)
  );
  const result = await getDocs(q);
  result.forEach((result) => {
    arrayMostAvaliableProducts.push({
      ...result.data(),
      id: result.id,
    } as IPizza);
  });
  return arrayMostAvaliableProducts;
};

export const getPass = async () => {
  const passRef = doc(db, "senha", "senha");
  const result = await getDoc(passRef);
  const pass = result.data();
  return pass;
};
