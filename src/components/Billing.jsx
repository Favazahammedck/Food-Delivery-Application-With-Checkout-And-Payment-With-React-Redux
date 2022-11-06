import React, { useEffect, useState } from "react";
import "../Styles/BillingStyle.css";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import EmptyCart from "../img/emptyCart.svg";
import HeaderOnlyLogo from "./HeaderOnlyLogo";
import { useNavigate } from "react-router-dom";
import { BillingContext } from "./BillingContext";
import { useContext } from "react";

// import { useForm } from "react-hook-form";
const Billing = () => {
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
  console.log("date=", date);
  console.log("month=", month);
  console.log("time=", time);
  console.log("setModeOfShipping=", setModeOfShipping);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  // const onSubmit = (data) => {
  //   reset();
  // };
  // console.log("errors", errors);
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [razorpayResponse, setRazorpayResponse] = useState("");
  console.log("razorpayResponse state=", razorpayResponse);
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);
  const navigate = useNavigate();

  // handleSaveToDb

  const handleSaveToDb = async (event) => {
    const result = fetch(
      "https://paymentstatusfodddelivery-default-rtdb.firebaseio.com//paymentStatusFoodDeliveryApp.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,

          month,

          time,
          status,
          amount,
          deliveryMode,
          modeOfShipping,
        }),
      }
    );
    console.log("result of save to db", result);
  };

  // hanlde submit

  const handleSubmitBilling = (e) => {
    e.preventDefault();
    handleSaveToDb();
    var currentDate = new Date();
    setDate(currentDate.getDate(), currentDate.getMonth());

    var currentMonth = new Date();
    const locale =
      navigator.languages != undefined
        ? navigator.languages[0]
        : navigator.language;
    setMonth(currentMonth.toLocaleDateString(locale, { month: "long" }));

    let now = new Date();

    new Intl.DateTimeFormat("default", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    }).format(now);

    setTime(
      new Intl.DateTimeFormat("default", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      }).format(now)
    );

    if (tot + 2 == "") {
      setStatus("Failed");
      console.log("tot", tot + 2);
      alert("please enter amount");
    } else {
      // alert(tot+2)
      setAmount(tot - discountRate + firstCheckbox);
      var options = {
        key: "rzp_test_8JpRUvNnpNQxUO",
        key_secret: "KZnOUJ9n1M3XSizBTQekZfM8",
        amount: (tot - discountRate + firstCheckbox) * 100,
        currency: "INR",
        name: "FOODLINES",
        description: "foodline razorpay payment",
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          if (response) {
            setRazorpayResponse("success");
            navigate("/successordermessage");
          } else {
            setRazorpayResponse("failed");
          }
          console.log("razorpay response", response);
        },
        prefill: {
          name: "favazahammedck",
          email: "favazahammedck@gmail.com",
          contact: "9544338148",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#ff8028",
        },
      };
      if (codChecked == true) {
        setModeOfShipping("Cash On Delivery");
        setStatus("Success");
        navigate("/successordermessage");
      } else {
        setModeOfShipping("Card Payment/Net Banking");
        setStatus("Success");
        var pay = new window.Razorpay(options);
        pay.open();
      }
    }
  };
  const [codChecked, setCodChecked] = useState("");
  const codOrNot = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setCodChecked(true);
    } else {
      setCodChecked(false);
    }
  };

  return (
    <>
      <div>
        <HeaderOnlyLogo />
      </div>
      <div className="checkoutAll">
        <div className="checkoutMain">
          <h1>Billing Step</h1>
          {/* <form> */}

          <div className="inputBox checkBox">
            <label for="billing">
              {" "}
              My billing and shipping addresses are the same
            </label>

            <input type="checkbox" id="billing" name="billing" value="Fast" />
          </div>
          <div className="inputBox checkBox">
            <input
              type="checkbox"
              id="firstBillingCheckBox"
              name="firstBillingCheckBox"
              value="card"
            />
            <label for="firstBillingCheckBox">
              {" "}
              Credit Card/Debit Card/Net Banking
            </label>
          </div>
          <div className="inputBox checkBox">
            <input
              type="checkbox"
              id="secondBillingCheckBox"
              name="secondBillingCheckBox"
              value="cod"
              onClick={(e) => {
                codOrNot(e);
              }}
            />
            <label for="secondCheckBox"> Cash On Delivery</label>
          </div>

          <input
            type="button"
            className=" p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg billingBtn"
            value="Complete Order"
            onClick={handleSubmitBilling}
          />
          {/* </form> */}
        </div>

        {/* ORDER SUMMARY...... */}
        <div className="orderSummarySection">
          <h1>Order Summary</h1>
          {cartItems && cartItems.length > 0 ? (
            <div className="flex flex-col p-6">
              {/* cart Items section */}
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item) => (
                  <div
                    className="w-full p-1 px-2 rounded-lg bg-gradient-to-tr from-orange-400 to-orange-600 flex items-center gap-5 summaryItemDetails"
                    key={item?.title}
                  >
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

              {firstCheckbox == 4 ? (
                <>
                  <div className="w-full  subTotal">
                    <p className=" text-lg">Subtotal: {tot - discountRate}</p>
                    <p className=" text-lg">Delivery: ₹ 4</p>
                  </div>
                  <div className="w-full subTotal allTotal">
                    <p className=" text-lg">
                      Total Amount: {tot - discountRate + 4}
                    </p>
                  </div>
                </>
              ) : null}
              {firstCheckbox == 2 ? (
                <>
                  <div className="w-full  subTotal">
                    <p className=" text-lg">Subtotal: {tot - discountRate}</p>
                    <p className=" text-lg">Delivery: ₹ 2</p>
                  </div>
                  <div className="w-full  subTotal allTotal">
                    <p className=" text-lg">
                      Total Amount : {tot - discountRate + 2}
                    </p>
                  </div>
                </>
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
      </div>
    </>
  );
};
// }

export default Billing;
