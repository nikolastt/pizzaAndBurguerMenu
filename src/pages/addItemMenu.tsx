import React, { useState } from "react";
import Footer from "../components/Footer";
import { mascaraMoeda } from "../assets/mascaraMoeda";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import { BounceLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddItemMenu: React.FC = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [ingredients, setIngredients] = useState("");
  const [ingredientsError, setIngredientsError] = useState(false);

  const [amountHamburguer, setAmountHamburguer] = useState("");
  const [amountHamburguerError, setAmountHamburguerError] = useState(false);

  const [amountM, setAmountM] = useState("");
  const [amountMError, setAmountMError] = useState(false);

  const [amountG, setAmountG] = useState("");
  const [amountGError, setAmountGError] = useState(false);

  const [amountGG, setAmountGG] = useState("");
  const [amountGGError, setAmountGGError] = useState(false);

  const [amountExG, setAmountExG] = useState("");
  const [amountExGError, setAmountExGError] = useState(false);

  const [img, setImg] = useState("");
  const [imgError, setImgError] = useState(false);

  const [typeProduct, setTypeProduct] = useState<"pizza" | "hamburguer">(
    "hamburguer"
  );

  const [SuccessInputInDataBase, setSuccessInputInDataBase] = useState(false);
  const [SuccessErrorInDataBase, setErrorInputInDataBase] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkHamburgerInputs = () => {
    let isInvalid = false;

    if (name === "") {
      setNameError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (ingredients === "") {
      setIngredientsError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (amountHamburguer === "") {
      setAmountHamburguerError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (img === "") {
      setImgError(true);
      setLoading(false);
      isInvalid = true;
    }

    return isInvalid;
  };

  const checkPizzasInputs = () => {
    let isInvalid = false;
    if (name === "") {
      setNameError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (ingredients === "") {
      setIngredientsError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (amountM === "") {
      setAmountMError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (amountG === "") {
      setAmountGError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (amountGG === "") {
      setAmountGGError(true);
      setLoading(false);
      isInvalid = true;
    }
    if (amountExG === "") {
      setAmountExGError(true);
      setLoading(false);
      isInvalid = true;
    }

    return isInvalid;
  };

  const addProduct = async () => {
    typeProduct === "hamburguer"
      ? await addDoc(collection(db, "hamburguers"), {
          name,
          ingredients,
          amountHamburguer,
          img,
        })
          .then(() => {
            notifySuccess();
            clearInputs("hamburguers");
            setLoading(false);
          })
          .catch(() => {
            notifyError();
          })
      : await addDoc(collection(db, "pizzas"), {
          name,
          ingredients,
          amountM,
          amountG,
          amountGG,
          amountExG,
          img,
        })
          .then(() => {
            notifySuccess();
            clearInputs("pizzas");
            setLoading(false);
          })
          .catch(() => {
            notifyError();
          });
  };

  async function handleAddProduct() {
    setSuccessInputInDataBase(false);
    setErrorInputInDataBase(false);
    setLoading(true);

    const isInvalid =
      typeProduct === "hamburguer"
        ? checkHamburgerInputs()
        : checkPizzasInputs();

    if (!isInvalid) {
      try {
        await addProduct();
      } catch {
        setErrorInputInDataBase(true);
        setLoading(false);
      }
    }
  }

  const notifySuccess = () =>
    toast.success("Produto adicionado!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notifyError = () =>
    toast.error("Algo deu errado !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const clearInputs = (typeInputs: string) => {
    if (typeInputs === "hamburguers") {
      setName("");
      setAmountHamburguer("");
      setIngredients("");
      setImg("");
    } else {
      setName("");
      setAmountM("");
      setAmountG("");
      setAmountGG("");
      setAmountExG("");
      setIngredients("");
      setImg("");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen px-3">
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 pt-10">
        <div className="flex flex-col col-span-2">
          <label htmlFor="select">Selecione o que vai adicionar</label>
          <select
            name=""
            id="select"
            className="bg-gray-700 focus:outline-none px-3 py-1 rounded-lg "
            onChange={(e) =>
              setTypeProduct((e.target.value as "hamburguer") || "pizza")
            }
          >
            <option
              className="bg-gray-700 focus:outline-none px-3 py-1 rounded-lg hover:bg-primary-500 "
              value="hamburguer"
            >
              Hamburguer
            </option>
            <option
              className="bg-gray-700 focus:outline-none px-3 py-1 rounded-lg "
              value="pizza"
            >
              Pizza
            </option>
          </select>
        </div>

        <div key="nome" className="flex flex-col">
          <label htmlFor="nome">Nome</label>
          <input
            type="Text"
            name="nome"
            id="nome"
            value={name}
            className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
              nameError && "border-b-2 border-red-500"
            }`}
            onChange={(e) => {
              setNameError(false);
              setName(e.target.value);
            }}
          />
        </div>

        {typeProduct === "hamburguer" ? (
          <div key="valor" className="flex flex-col ">
            <label htmlFor="valor">Valor</label>
            <input
              type="Text"
              name="valor"
              id="valor"
              value={amountHamburguer}
              className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
                amountHamburguerError && "border-b-2 border-red-500"
              }`}
              onChange={(e) => {
                setAmountHamburguerError(false);
                mascaraMoeda(e.target, e.target);
                setAmountHamburguer(e.target.value);
              }}
            />
          </div>
        ) : (
          <>
            <div key="valorPizzaM" className="flex flex-col ">
              <label htmlFor="valorPizzaM">Valor pizza M</label>
              <input
                type="Text"
                name="valorPizzaM"
                id="valorPizzaM"
                value={amountM}
                className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
                  amountMError && "border-b-2 border-red-500"
                }`}
                onChange={(e) => {
                  setAmountMError(false);
                  mascaraMoeda(e.target, e.target);
                  setAmountM(e.target.value);
                }}
              />
            </div>

            <div key="valorPizzaG" className="flex flex-col ">
              <label htmlFor="valorPizzaG">Valor pizza G</label>
              <input
                type="Text"
                name="valorPizzaG"
                id="valorPizzaG"
                value={amountG}
                className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
                  amountGError && "border-b-2 border-red-500"
                }`}
                onChange={(e) => {
                  setAmountGError(false);
                  mascaraMoeda(e.target, e.target);
                  setAmountG(e.target.value);
                }}
              />
            </div>

            <div key="valorPizzaGG" className="flex flex-col ">
              <label htmlFor="valorPizzaGG">Valor pizza GG</label>
              <input
                type="Text"
                name="valorPizzaGG"
                id="valorPizzaGG"
                value={amountGG}
                className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
                  amountGGError && "border-b-2 border-red-500"
                }`}
                onChange={(e) => {
                  setAmountGGError(false);
                  mascaraMoeda(e.target, e.target);
                  setAmountGG(e.target.value);
                }}
              />
            </div>

            <div key="valorPizzaExG" className="flex flex-col ">
              <label htmlFor="valorPizzaExG">Valor pizza ExG</label>
              <input
                type="Text"
                name="valorPizzaExG"
                id="valorPizzaExG"
                value={amountExG}
                className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
                  amountExGError && "border-b-2 border-red-500"
                }`}
                onChange={(e) => {
                  setAmountExGError(false);
                  mascaraMoeda(e.target, e.target);
                  setAmountExG(e.target.value);
                }}
              />
            </div>
          </>
        )}

        <div className="flex flex-col col-span-2">
          <label htmlFor="ingredientes">Ingredientes</label>
          <textarea
            name="ingredientes"
            id="ingredientes"
            cols={30}
            rows={5}
            value={ingredients}
            className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
              ingredientsError && "border-b-2 border-red-500"
            }`}
            onChange={(e) => {
              setIngredientsError(false);
              setIngredients(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="flex flex-col col-span-2">
          <label htmlFor="ingredientes">Link imagem</label>
          <input
            name="ingredientes"
            id="ingredientes"
            type="text"
            value={img}
            className={`bg-gray-700 focus:outline-none px-3 py-1 rounded-lg ${
              imgError && "border-b-2 border-red-500"
            }`}
            onChange={(e) => {
              setImgError(false);
              setImg(e.target.value);
            }}
          ></input>

          <div className="w-full rounded-lg h-64 border border-primary-500 mx-auto mt-6 overflow-hidden">
            <img
              src={img || `/images/pizzaAndHamburguer.jpg`}
              alt="Image product"
              className="w-full h-full object-cover object-center "
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 mb-20">
        {loading ? (
          <BounceLoader color="#d88c43" size={60} />
        ) : (
          <button
            className="w-2/3 bg-primary-500 rounded-md px-3 py-2 flex justify-center items-center mb-10"
            onClick={handleAddProduct}
          >
            Adicionar
          </button>
        )}
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

export default AddItemMenu;
