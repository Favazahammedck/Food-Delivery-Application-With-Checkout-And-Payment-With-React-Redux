import React from "react";
import "../Styles/MyAccountHeader.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { useStateValue } from "../context/StateProvider";
import Logo from "../img/logo.png";
import { useContext } from "react";
import { BillingContext } from "./BillingContext";
import "../Styles/CoupenCode.css";
// import { useState } from "react";





const CoupenCode = () => {
  const { coupenCodes } = useContext(BillingContext);
  console.log("coupenCode====", coupenCodes);

//   const handleCoupen=()=>{
      
//   }

  return (
    <>
    
      <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
        {/* desktop & tablet */}
        <div className="hidden md:flex w-full h-full items-center justify-between">
          <Link to={"/"} className="flex items-center gap-2">
            <img src={Logo} className="w-8 object-cover" alt="logo" />
            <p className="text-orange-500 text-xl font-bold"> FOODLINE</p>
            <h1>MY ACCOUNT</h1>
          </Link>

          <div className="flex items-center gap-8">
            <motion.ul
              initial={{ opaFOODLINE: 0, x: 200 }}
              animate={{ opaFOODLINE: 1, x: 0 }}
              exit={{ opaFOODLINE: 0, x: 200 }}
              className="flex items-center gap-24 "
            >
              <Link to={"/myorders"}>
                <li className="text-lg  text-textColor  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  My Orders
                </li>
              </Link>
              <Link to={"/myprofile"}>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  My Profile
                </li>
              </Link>
              <Link to={"/coupencode"}>
                <li className="text-lg  text-white bg-orange-400  rounded hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  My Coupens
                </li>
              </Link>
              <Link to={"/paymentstatus"}>
                <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Payment Status
                </li>
              </Link>
            </motion.ul>
          </div>
        </div>

        {/* mobile */}
        <div className="flex items-center justify-between md:hidden w-full h-full ">
          <Link to={"/"} className="flex items-center gap-2">
            <img src={Logo} className="w-8 object-cover" alt="logo" />
            <p className="text-orange-500 text-xl font-bold"> FOODLINE</p>
          </Link>
        </div>
        <div className="coupenHeading">
          <h1>Availabe Coupens</h1>
        </div>
      </header>
      <div className="coupens">
        {coupenCodes.map((coupenAndDiscount) => (
          <>
            <div className="coupensInner">
              <h1 id="codeOfcoupen">
                {coupenAndDiscount.code} <br />{" "}
                <span className="discountPercentage" id="discountCode">
                  Discount :{coupenAndDiscount.discount}%
                </span>{" "}
                <br />{" "}
                <button className="copyBtn" id="copyButton">
                  {" "}
                  COPY CODE
                </button>
              </h1>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default CoupenCode;
