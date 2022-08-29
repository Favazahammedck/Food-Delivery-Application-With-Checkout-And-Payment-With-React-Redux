import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Billing, CreateContainer, MainContainer } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import Checkout from "./components/Checkout";
import SuccessOrderMessage from "./components/SuccessOrderMessage";
import MyAccount from "./components/MyAccount";
import { BillingContext } from "./components/BillingContext";
import { useState } from "react";
import MyOrders from "./components/MyOrders";
import MyAccountHeader from "./components/MyAccountHeader";
import CoupenCode from "./components/CoupenCode";
import PaymentStatus from "./components/PaymentStatus";
import {coupenCodes} from './utils/data'
const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const [firstCheckbox, setFirstCheckBox] = useState("");
  const [secondCheckbox, setSecondCheckBox] = useState("");
  

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {/* <div className="w-screen h-auto flex flex-col bg-primary"> */}
      {/* <Header /> */}
      <main className="w-full">
        <BillingContext.Provider
          value={{
            firstCheckbox,
            setFirstCheckBox,
            secondCheckbox,
            setSecondCheckBox,
            coupenCodes,
          }}
        >
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/billing" element={<Billing />} />
            <Route
              path="/successordermessage"
              element={<SuccessOrderMessage />}
            />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/myorders" element={<MyOrders/>}/>
            <Route path="/myprofile" element={<MyAccountHeader/>}/>
            <Route path="/coupencode" element={<CoupenCode/>}/>
            <Route path="/paymentstatus" element={<PaymentStatus/>}/>

           
          </Routes>
        </BillingContext.Provider>
      </main>
      {/* </div> */}
    </AnimatePresence>
  );
};

export default App;
