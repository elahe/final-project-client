// in "src/components/PaymentIntent.jsx"

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import service from "../services/config.services";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function PaymentIntent({ cart }) {
  console.log(cart);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    //const filtredCart = cart.filter(item=>item.product)

    const response = await service.post(`/payment/create-payment-intent`, {
      cart,
    });

    setClientSecret(response.data.clientSecret);
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
    wallets: { link: "never" },
    loader: "auto",
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentIntent;
