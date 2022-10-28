export interface IPizza {
  amountExG: string;
  amountG: string;
  amountGG: string;
  amountM: string;
  img: string;
  ingredients: string;
  name: string;
  id: string;
  rate?: {
    qnt: number;
    rate: number;
  };
}

export interface IHamburguer {
  amountHamburguer: string;
  img: string;
  ingredients: string;
  name: string;
  id: string;
  rate?: {
    qnt: number;
    rate: number;
  };
}
