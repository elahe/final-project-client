// in "src/components/PaymentSuccess.jsx"

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import service from "../services/config.services";

const PaymentSuccess = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    handleUseEffect();
  }, []);

  const handleUseEffect = async () => {
    const clientSecret = new URLSearchParams(location.search).get(
      "payment_intent_client_secret"
    );
    const paymentIntentId = new URLSearchParams(location.search).get(
      "payment_intent"
    );

    const paymentIntentInfo = {
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId
    }

    try {
      await service.patch(`/payment/update-payment-intent`, paymentIntentInfo)
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching) {
    return <h3>... updating payment</h3>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Thank you for your order!</h1>
          <Link to="/" className="text-xl text-blue-500 hover:text-blue-700">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;