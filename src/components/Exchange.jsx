import React, { useState } from 'react'
import styles from '../style';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const Exchange = () => {
  const [Show, setShow] = useState(false);
  const [Success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderId, setorderId] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'Friends and Family',
          amount: {
            currency_code: 'USD',
            value: 40
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

  return (

    <section id="exchange" className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}>
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient" />
      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <span className={styles.heading2}>
          <h1 className={styles.heading2}>Dollar Exchange</h1>
          <p className={styles.paragraph}>Exchange USD with PKR</p>
        </span>
        <div className="w-full md:mt-0 mt-6">
          <p className={`${styles.paragraph} text-left max-w-[450px]`}>
            <PayPalScriptProvider
              options={{
                "client-id": "AQ8RUsectsEAW_XYmf6sYYQQLvhICEyOcw2Zcu-shc-vpu4ojWt8wus0iP3KdFr3XVVpafLh2Jf6Q0gt",
                "disable-funding": "credit"
              }}
            >

              <PayPalButtons style={{ layout: 'vertical' }}
               createOrder={createOrder}
               onApprove={onApprove}
               onError={onError} />
            </PayPalScriptProvider>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Exchange