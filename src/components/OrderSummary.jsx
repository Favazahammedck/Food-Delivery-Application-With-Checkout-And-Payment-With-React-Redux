import React, { useEffect, useState } from "react";
import "../Styles/CheckOut.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import EmptyCart from "../img/emptyCart.svg";


const OrderSummary = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();



  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [countries, setCountries] = useState([]);
  console.log("country result", countries);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const countryDatas = require("../utils/countryData.json");
    console.log("countryDatas===", countryDatas);
    setCountries(countryDatas);
    const statesData = require("../utils/statesData.json");
    setStates(statesData);
    console.log("states data", statesData);

    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const [firstCheckbox, setFirstCheckBox] = useState("");
  console.log("true", firstCheckbox);
  const findCheckedBoxOrNot = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setFirstCheckBox(true);
    } else {
      setFirstCheckBox(false);
    }
  };
  const [secondCheckbox, setSecondCheckBox] = useState("");
  console.log("true", firstCheckbox);
  // const findCheckedBoxOrNotSecond = (e) => {
  //   const checked = e.target.checked;
  //   if (checked) {
  //     setSecondCheckBox(true);
  //   } else {
  //     setSecondCheckBox(false);
  //   }
  // };

  return (
    <>
     <div>
          <h1>Order Summary</h1>
          <div className="cartcount">
            {cartItems && cartItems.length > 0 && (
              <p className="text-xs  font-semibold">
                [Total Items In Cart: ({cartItems.length})]
              </p>
            )}
          </div>
          {cartItems && cartItems.length > 0 ? (
            <div className="flex flex-col p-6">
              {/* cart Items section */}
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => (
                  <div className="w-full p-1 px-2 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center gap-5 summaryItemDetails">
                    <img
                      src={item?.imageURL}
                      className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                      alt="itemimage"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-gray-50">{item?.title}</p>
                      <p className="text-sm block text-gray-300 font-semibold">
                        Category : {item?.category}
                      </p>
                      <p className="text-sm block text-gray-300 font-semibold">
                        Calories : {item?.calories}
                      </p>
                    </div>

                    <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                      <motion.div whileTap={{ scale: 0.75 }}>
                        <h1 className="price">₹ : {item?.price}</h1>
                      </motion.div>
                    </div>
                  </div>
                ))}
              {/* cart total section */}

              {firstCheckbox == true ? (
                <div className="w-full  subTotal">
                  <p className=" text-lg">Subtotal: {tot}</p>
                  <p className=" text-lg">Delivery: ₹ 4</p>
                </div>
              ) : null}
              {firstCheckbox == true ? (
                <div className="w-full subTotal allTotal">
                  <p className=" text-lg">Total Amount To Pay: {tot + 4}</p>
                </div>
              ) : null}
              {secondCheckbox == true ? (
                <div className="w-full  subTotal">
                  <p className=" text-lg">Subtotal: {tot}</p>
                  <p className=" text-lg">Delivery: ₹ 2</p>
                </div>
              ) : null}
              {secondCheckbox == true ? (
                <div className="w-full  subTotal allTotal">
                  <p className=" text-lg">Total Amount To Pay: {tot + 2}</p>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
              <img src={EmptyCart} className="w-300" alt="" />
              <p className="text-xl text-textColor font-semibold">
                Add some items to your cart
              </p>
            </div>
          )}
        </div>
    </>
  );
};
// }

export default OrderSummary;
