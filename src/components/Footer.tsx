import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { FaHamburger, FaHome, FaPizzaSlice } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";

const Footer: React.FC = () => {
  const router = useRouter();
  const path = router.pathname.split("/")[1];

  return (
    <div className="bg-[#030612] rounded-t-3xl fixed bottom-0 left-0 right-0 z-10 h-20 w-full flex items-center justify-evenly">
      <Link href="/" passHref>
        <a>
          <FaHome
            size={30}
            color={path === "" ? "#d88c43" : "white"}
            className="cursor-pointer hover:scale-125 duration-300"
          />
        </a>
      </Link>

      <Link href="/pizzaMenu" passHref>
        <a>
          <FaPizzaSlice
            size={30}
            color={path === "pizzaMenu" ? "#d88c43" : "white"}
            className="cursor-pointer hover:scale-125 duration-300"
          />
        </a>
      </Link>

      <FaHamburger
        size={30}
        color={path === "hamburguer" ? "#d88c43" : "white"}
        className="cursor-pointer hover:scale-125 duration-300"
      />

      <Link href="/addItemMenu">
        <a>
          <IoIosAdd
            size={30}
            color={path === "addItemMenu" ? "#d88c43" : "white"}
            className="cursor-pointer hover:scale-125 duration-300"
          />
        </a>
      </Link>
    </div>
  );
};

export default Footer;