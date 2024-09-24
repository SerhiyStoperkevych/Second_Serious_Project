'use client';

import { useState } from "react";
import CheckoutForm from './CheckoutForm';
import Cart from "./Cart";
import WrappedPaymentForm from "./PaymentForm";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

const Checkout = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isAddressSubmitted, setIsAddressSubmitted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressSubmit = (submittedAddress: Address) => {
    setAddress(submittedAddress);
    setIsAddressSubmitted(true);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log("Payment successful! PaymentIntent ID:", paymentIntentId);
    // Optionally, redirect to a success page or clear cart
  };

  const handleCheckout = (total: number) => {
    console.log("Checkout total:", total);
    setIsProcessing(true);
    // Simulate checkout processing
    setTimeout(() => {
      setIsProcessing(false);
      // You might want to handle additional checkout logic here
    }, 2000);
  };

  return (
    <div className="p-4">
      <Cart onCheckout={handleCheckout} />
      {!isAddressSubmitted ? (
        <CheckoutForm onSubmit={handleAddressSubmit} />
      ) : (
        <>
          {isProcessing ? (
            <div className="text-center text-lg font-semibold">Processing payment...</div>
          ) : (
            <WrappedPaymentForm onSuccess={handlePaymentSuccess} />
          )}
        </>
      )}
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default Checkout;
