import React from 'react'
import '../Styles/SuccessOrderMessage.css'
import Success from '../img/success.gif'
import { Link } from 'react-router-dom'
import HeaderOnlyLogo from './HeaderOnlyLogo'
const SuccessOrderMessage = () => {
  return (
      <>
      <HeaderOnlyLogo/>
    <div className='successMain'>
   <img src={Success} alt="" />
    </div>
  
    <div className='successDetails'>
    <h1><strong> Your Order Successfully Placed </strong></h1>
    
    </div>
    <div className="myaccountbtn">
        <Link to="/myorders">
    <input
            type="button"
            className=" p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
            value="Track Your Order"
          />
          </Link>
    </div>

    </>
  )
}

export default SuccessOrderMessage