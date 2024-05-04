import React, { useState, useEffect } from 'react'
import styles from '../style';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CURRENCY } from '../tool/USDVDE';
import axios from 'axios';
import Swap from "./Swap";
let over_amount = 0;
let USDVDE = 0;

axios.get('http://localhost:3000/exchangerate')
.then(response => {
  console.log(response.data);
  USDVDE = response.data;
}).catch(err => {
  console.log("Unable");
});

const Exchange = () => {

  const [Show, setShow] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderId, setorderId] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAccount, setPaymentAccount] = useState('');

  const [initialValue, setinitialValue] = useState(0);
  const [userDetails, setUserDetails] = useState({
	email: "",
	paymentMethod: "JazzCash",
	USD: "",
	VDE: "0"
  });

  const returnGross = (inputVal) => {
	let fee = 4.4;
	if (inputVal > 3000 && inputVal <= 10000) {
	  fee = 3.9; 
	} else if (inputVal > 10000 && inputVal <= 100000) {
	  fee = 3.7;
	} else if (inputVal > 100000) {
	  fee = 3.4;
	}

	var overallfee = (inputVal / 100) * fee;
	var grossDollars = inputVal - overallfee;

	//var totalVDE = parseInt(grossDollars * CURRENCY.USDVDE);
	var totalVDE = parseInt(grossDollars * USDVDE);
	

	var _tax = inputVal * CURRENCY.TAX;
	var grossVDE = totalVDE - _tax;

	if (inputVal === 0) {
	  grossVDE = 0;
	  grossDollars = 0;
	}

	
	var rVal = {
	  _fee: fee,
	  VDE: grossVDE,
	  USD: grossDollars
	}
	return rVal;
  }

  const createOrder = (data, actions) => {
	return actions.order.create({
	  purchase_units: [
		{
		  description: 'Friends and Family',
		  amount: {
			currency_code: 'USD',
			value: over_amount
		  },
		},
	  ],
	  application_context: {
		shipping_preference: 'NO_SHIPPING'
	  }
	}).then((orderID) => {
	  setorderId(orderID);
	  return orderID;
	})
  }

  const onApprove = (data, actions) => {
	return actions.order.capture().then(function (details) {
	  const { payer } = details;
	  setSuccess(true);
	})
  }

  const onError = (data, actions) => {
	setErrorMessage('An error occured with your payment');    
  }

  useEffect(() => {
	over_amount = initialValue;
  }, [initialValue])

  const updateAmount = (event) => {
	var _amount = parseInt(event.target.value);
	var _c = isNaN(_amount) ? 0 : _amount;
	
	var _gross = returnGross(_c);
	setinitialValue(_c);
	
	
	setInsideState("VDE", _gross.VDE);
	setInsideState("USD", _gross.USD);
  }

  const updateUserInfo = (event) => {
	const { value, name } = event.target;
	setInsideState(name, value);
  }

  const setInsideState = (_name, _value) => {
	setUserDetails((prev) => {
	  return { ...prev, [_name]: _value }
	});
	console.info(userDetails);
  }

  return (
	<section id="exchange" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
	  <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient" />
	  <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
		<span className={styles.heading2}>
		  <h1 className={styles.heading2}>VNDES SWAP</h1>
		  <p className={styles.paragraph}>Exchange USD with VDE</p>
		
		</span>
		<div className="w-full md:mt-0 mt-6">
		 <Swap />
		</div>
	  </div>
	</section>
  )
}

export default Exchange
