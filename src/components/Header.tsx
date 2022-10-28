import React from "react";

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <header className="relative h-[130px] max-w-2xl mx-auto">
      <div className="flex w-full items-center pt-10">
        <div className="bg-primary-500 w-full absolute z-10  h-1  " />
        <div className="mx-auto bg-gray-900 px-3 z-20 flex justify-center">
          <h1 className="w-10/12 sm:w-8/12 text-2xl  text-white font-title uppercase tracking-[10px] mx-auto flex justify-center z-20 text-center ">
            {title}
          </h1>
        </div>
      </div>
      <h2 className="text-6xl text-primary-500 font-subTitle  text-center -mt-5 ">
        menu
      </h2>
    </header>
  );
};

export default Header;
