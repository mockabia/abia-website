import React from "react";
import { Link } from "react-router-dom";
import "../../commonStyles.css"

const Public = () => {
  return (
    <>
      <main>
        <section className="mt-[30px] h-screen flex flex-col justify-start items-center">
          <h1 className="text-[24px] font-bold">ABIA PUBLIC PAGE</h1>
          <div className="flex justify-center items-center top-[50%] gap-2">
            <button className="simple-button">
              <Link to={"/signup"}>Vendor</Link>
            </button>
            <button className="simple-button">
              <Link to={"/signup"}>Couple</Link>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Public;
