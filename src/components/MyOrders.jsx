import React, { useEffect, useState } from 'react'
import '../Styles/MyAccountHeader.css'
import '../Styles/MyOrders.css'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import Logo from "../img/logo.png";
import OrderSummary from './OrderSummary';
import { useContext } from 'react';
import { BillingContext } from './BillingContext';
import '../Styles/MyOrders.css'


const MyOrders = () => {
const [tot, setTot] = useState(0);
const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
const [flag, setFlag] = useState(1);
useEffect(() => {
  let totalPrice = cartItems.reduce(function (accumulator, item) {
    return accumulator + item.qty * item.price;
  }, 0);
  setTot(totalPrice);
  console.log(tot);
}, [tot, flag]);

  const { firstCheckbox, secondCheckbox } = useContext(BillingContext);

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
            <li className="text-lg text-white bg-orange-400 rounded  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              My Orders
            </li>
            </Link>
            <Link to={"/myprofile"}>
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                My Profile
              </li>
            </Link>
            <Link to={"/coupencode"}>
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Coupen Code
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
     
    </header>
     <div>
       <br />
       <br />
       <br />
       <br />
       <br />


     <OrderSummary/>
     <div className='totalAmount'>
     {firstCheckbox == "fast" ? (
                <>
                  {/* <div className="w-full  subTotal">
                    <p className=" text-lg">Subtotal: {tot}</p>
                    <p className=" text-lg">Delivery: ₹ 4</p>
                  </div> */}
                  <div className="w-full subTotal allTotal">
                    <p className=" text-lg">Total Amount (Including Delivery Charges) : {tot + 4}</p>
                  </div>
                </>
              ) :null}
              {secondCheckbox == "normal" ? (
               
                <>
                  {/* <div className="w-full  subTotal">
                    <p className=" text-lg">Subtotal: {tot}</p>
                    <p className=" text-lg">Delivery: ₹ 2</p>
                  </div> */}
                  <div className="w-full  subTotal allTotal myTotal">
                    <p className=" text-lg">Total Amount (Including Delivery Charges) : {tot + 2}</p>
                  </div>
                </>
                ) :null}
              
    </div>
    </div>
    

   

</>
  )
}

export default MyOrders