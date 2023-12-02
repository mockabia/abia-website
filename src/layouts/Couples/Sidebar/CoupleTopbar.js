import React from "react";
import AbiaLogo from "../../../abiaLogo";
import { ReactComponent as UserIcons } from "../../../icons/contact topbar.svg";
import { ReactComponent as MenuIcon } from "../../../icons/menuIcon.svg";


const CoupleTopbar = () => {
  return (
    <div className="bg-[#6cc2bc]  h-[6rem]  flex items-center justify-between fixed top-0 left-0 right-0 z-40 border-b border-[#6cc2bc] ">
      {/* md:bg-[#fff] */}
      <div
        // onClick={handleLogoClick}
        className="relative w-[85px] ml-[1.5rem]  md:ml-[5rem] cursor-pointer"
        // md:hidden
      >
        <AbiaLogo />
      </div>
      <div className=" flex mt-[14px] md:mt-0 ">
        <button className="mr-4 focus:outline-none" >
          <div className="relative ">
            <div className="absolute inset-0  bg-[#6cc2bc] w-[10px] h-[10px] md:w-[40px] md:h-[40px] mt-[-9px] rounded-full"></div>
            <UserIcons
              fill="#fff"
              className="w-[22px] relative z-10 md:text-[#6cc2bc] ml-[8.5px]  md:mr-10  "
            />
          </div>
        </button>
       

        {/* mobile mode */}
        <button className="mr-7 md:hidden" >
          <MenuIcon size={28} className=" mt-[2px] stroke-[#fff]" />
        </button>
       
      </div>
    </div>
  );
};

export default CoupleTopbar;
