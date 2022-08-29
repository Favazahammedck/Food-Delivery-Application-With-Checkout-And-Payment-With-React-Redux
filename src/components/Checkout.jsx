import React, { useEffect, useState } from "react";
import "../Styles/CheckOut.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { actionType } from "../context/reducer";

import { useForm } from "react-hook-form";
import HeaderOnlyLogo from "./HeaderOnlyLogo";
// import {firebase} from "../firebase.config";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { BillingContext } from "./BillingContext";
import { useContext } from "react";



const Checkout = () => {
  const {firstCheckbox,setFirstCheckBox,secondCheckbox,setSecondCheckBox}=useContext(BillingContext)
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const { coupenCodes } = useContext(BillingContext);
  console.log("coupenCode==In Checkout",coupenCodes);

  const [coupenDiscount,setCoupenDiscout]=useState("")
  const handleCoupen=(userDetails)=>{
// if(userDetails==)
 
  }
 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (data) {
      saveDetails();
    }
    reset();
  };

  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumer: "",
    country: "",
    state: "",
    streetAdrress: "",
    city: "",
    zip: "",
    shippingMethod: "",
    coupenCode: "",
  });
  let name, value;

  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };



  // connect with firebase for userDetails save to the realtime db.
  const saveDetails = async (event) => {
    event.preventDefault();
    const {
      email,
      firstName,
      lastName,
      phoneNumer,
      country,
      state,
      streetAdrress,
      city,
      zip,
      shippingMethod,
      coupenCode,
    } = userDetails;

    const result = fetch(
      "https://fooddeliverycutomerdetails-default-rtdb.firebaseio.com/userDetailsCollection.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNumer,
          country,
          state,
          streetAdrress,
          city,
          zip,
          // shippingMethod,
          coupenCode,
        }),
      }
    ).then(() => {
      navigate("/billing");
    });
  };

  // const showCart = () => {
  //   dispatch({
  //     type: actionType.SET_CART_SHOW,
  //     cartShow: !cartShow,
  //   });
  // };

  console.log("errors", errors);

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

  // const [firstCheckbox, setFirstCheckBox] = useState("");
  // console.log("fast", firstCheckbox);
  const findCheckedBoxOrNot = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setFirstCheckBox("fast");
    }
  };
  // const [secondCheckbox, setSecondCheckBox] = useState("");
  // console.log("normal", secondCheckbox);
  const findCheckedBoxOrNotSecond = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSecondCheckBox("normal");
    } 
  };

  return (
    <>
      <div>
        <HeaderOnlyLogo />
      </div>
      <div className="checkoutAll">
        <div className="checkoutMain">
          <h1>Shipping Step</h1>
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <p className="labels">Enter Personal Information</p>
            <p className="inputBoxLabel">
              E-mail <span className="star">*</span>
            </p>
            <input
              className="inputBox"
              type="text"
              name="email"
              // value={userDetails.email}
              onChange={postUserData}
              // {...register("email", {
              //   required: "Email is required !",
              //   pattern: {
              //     value:
              //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              //     message: "Please enter a valid email !",
              //   },
              // })}
            />
            {errors.email && <small>{errors.email.message}</small>}
            <p className="labels">Select shipping address</p>
            <p className="inputBoxLabel">
              First name <span className="star">*</span>
            </p>
            <input
              className="inputBox"
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={postUserData}
              // {...register("firstname", {
              //   required: "First name is required!",
              // pattern: {
              //   value: /^[A-Za-z]/,
              //   message: "Only Alphabets allowed !",
              // },
              // })}
            />
            {errors.firstname && <small>{errors.firstname.message}</small>}
            <p className="inputBoxLabel">
              Last name <span className="star">*</span>
            </p>
            <input
              className="inputBox"
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={postUserData}
              // {...register("lastname", {
              //   required: "Last name is required !",
              //   pattern: {
              //     value: /^[A-Za-z]/,
              //     message: "Only alphabets allowed !",
              //   },
              // })}
            />
            {errors.lastname && <small>{errors.lastname.message}</small>}
            <p className="inputBoxLabel">
              Phone number <span className="star">*</span>
            </p>
            <input
              className="inputBox"
              type="number"
              name="phoneNumer"
              value={userDetails.phoneNumer}
              onChange={postUserData}
              // {...register("phonenumber", {
              //   required: "Phone number is required !",
              //   pattern: {
              //     value: /^[0-9]/,
              //     message: "Only numbers are allowed !",
              //   },
              //   minLength: {
              //     value: 10,
              //     message: "This phone number is too short !",
              //   },
              //   maxLength: {
              //     value: 10,
              //     message: "This phone number is too long !",
              //   },
              // })}
            />
            {errors.phonenumber && <small>{errors.phonenumber.message}</small>}
            <p className="inputBoxLabel">
              Country <span className="star">*</span>
            </p>

            <select
              onChange={postUserData}
              name="country"
              value={userDetails.country}
              className="inputBox"
            >
              <option> Choose Your Country</option>
              {countries.map((countryNames) => (
                <option>{countryNames.country}</option>
              ))}
            </select>
            {errors.country && <small>{errors.country.message}</small>}
            <p className="inputBoxLabel">
              State/Province <span className="star">*</span>
            </p>

            <select
              name="state"
              value={userDetails.state}
              onChange={postUserData}
              className="inputBox"
            >
              <option> Select Your States </option>
              {states.map((stateName) => (
                <option>{stateName.state}</option>
              ))}
            </select>
            <p className="inputBoxLabel">
              Street address <span className="star">*</span>
            </p>
            <input
              className="inputBox"
              type="text"
              name="streetAdrress"
              value={userDetails.streetAdrress}
              onChange={postUserData}
              // {...register("streetadrress", {
              //   required: "Street address is required!",
              //   pattern: {
              //     value: /^[A-Za-z]/,
              //     message: "Only alphabets allowed !",
              //   },
              // })}
            />
            {errors.streetadrress && (
              <small>{errors.streetadrress.message}</small>
            )}
            <p className="inputBoxLabel">
              City <span className="star">*</span>
            </p>
            <input
              className="inputBox"
              type="text"
              name="city"
              value={userDetails.city}
              onChange={postUserData}
              // {...register("city", {
              //   required: "City is required!",
              //   pattern: {
              //     value: /^[A-Za-z]/,
              //     message: "Only alphabets allowed !",
              //   },
              // })}
            />
            {errors.city && <small>{errors.city.message}</small>}
            <p className="inputBoxLabel">
              Zip/Postal code <span className="star">*</span>
            </p>
            <input
              className="inputBox"
              type="number"
              name="zip"
              value={userDetails.zip}
              onChange={postUserData}
              // {...register("zip", {
              //   required: "Zip/Postal code is required!",
              //   pattern: {
              //     value: /^[0-9]/,
              //   },
              //   minLength: {
              //     value: 3,
              //     message: "This zip/postal code is too short !",
              //   },
              //   maxLength: {
              //     value: 10,
              //     message: "This zip/postal code is too long !",
              //   },
              // })}
            />
            {errors.zip && <small>{errors.zip.message}</small>}
            <p className="labels">Select shipping method</p>
            <div className="inputBox checkBox">
              <input
                type="checkbox"
                id="firstCheckBox"
                name="shippingMethod"
                value="1"
                onClick={(e) => {
                  findCheckedBoxOrNot(e);
                }}
              />
              <label for="firstCheckBox">
                Carrier Method: Fast Shipping, rate:Fixed- ₹ 4.00
              </label>
            </div>
            <div className="inputBox checkBox">
              <input
                type="checkbox"
                id="secondCheckBox"
                name="shippingMethod"
                value="2"
                onClick={(e) => {
                  findCheckedBoxOrNotSecond(e);
                }}
              />
              <label for="secondCheckBox">
                Carrier Method: Shipping Cost, rate:Fixed- ₹ 2
              </label>
            </div>
            <p className="discountCode">Have a discount code?</p>
            <input
              className="inputBox"
              id="coupenInputBox"
              placeholder="Apply coupen code"
              name="coupenCode"
              value={userDetails.coupenCode}
              onChange={postUserData}
            />
            <input
              type="button"
              className=" p-2 rounded bg-orange-400 text-gray-50 text-lg my-2 hover:shadow-lg billingBtn  coupenBtn"
              onClick={handleCoupen}
              value="APPLY COUPEN"
            />
            <input
              type="submit"
              className=" p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg billingBtn"
              value="Proceed To Billing"
              onClick={saveDetails}
            />
          </form>
        </div>

        {/* ORDER SUMMARY...... */}
        <div className="orderSummarySection">
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

              {/* {firstCheckbox == "fast" ? (
                <div className="w-full  subTotal">
                  <p className=" text-lg">Subtotal: {tot}</p>
                  <p className=" text-lg">Delivery: ₹ 4</p>
                </div>
              ) : null}
              {firstCheckbox == "fast" ? (
                <div className="w-full subTotal allTotal">
                  <p className=" text-lg">Total Amount To Pay: {tot + 4}</p>
                </div>
              ) : null}
              {secondCheckbox == "normal" ? (
                <div className="w-full  subTotal">
                  <p className=" text-lg">Subtotal: {tot}</p>
                  <p className=" text-lg">Delivery: ₹ 2</p>
                </div>
              ) : null} */}
              {/* {secondCheckbox == "normal" ? ( */}
                <div className="w-full  subTotal allTotal">
                  <p className=" text-lg">Total Amount : {tot}</p>
                </div>
              {/* ) : null} */}
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
      </div>
    </>
  );
};
// }

export default Checkout;
