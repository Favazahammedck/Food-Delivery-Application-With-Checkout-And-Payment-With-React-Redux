import React, { useContext } from 'react'
import '../Styles/PaymentStatus.css'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import Logo from "../img/logo.png";
import { BillingContext } from './BillingContext';



const PaymentStatus  = () => {
  const {
    firstCheckbox,
    setFirstCheckBox,
    discountRate,
    setDiscountRate,



    date,
    setDate,
    month,
    setMonth,
    time,
    setTime,
    deliveryMode,
    setDeliveryMode,
    modeOfShipping,
    setModeOfShipping,
    status,
    setStatus,
    amount,
    setAmount,

  } = useContext(BillingContext);
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
              <li className="text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Coupen Code
              </li>
            </Link>
            <Link to={"/paymentstatus"}>

            <li className="text-lg text-white bg-orange-400  rounded hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
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
    <div className="paymentStatusMain">
     
     <table>
  <caption>My Payment Status</caption>
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Time</th>
      <th scope="col">Delivery Mode</th>
      <th scope="col">Shipping Mode</th>
      <th scope="col">Status</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    <td data-label="Date">{date} {month}</td>
      <td data-label="Time">{time}</td>
      <td data-label="Delivery Mode">{deliveryMode}</td>
      <td data-label="Shipping Mode">{modeOfShipping}</td>
      <td data-label="Status">{status}</td>
      <td data-label="Amount"> {amount}</td>
    </tr>
    
  </tbody>
</table>
 </div>

</>
  )
}

export default PaymentStatus