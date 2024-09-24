import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  onSuccess: (paymentIntentId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: paymentIntent } = await axios.post('/api/create-payment-intent', {
        amount: 1000, // Example: $10.00 (amount in cents)
      });

      const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: cardElement!,
        },
      });

      if (error) {
        console.error('Payment confirmation error:', error);
      } else if (confirmedPaymentIntent) {
        onSuccess(confirmedPaymentIntent.id);
      }
    } catch (error) {
      console.error('Payment Intent creation error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 mt-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Payment Details</h2>
      <div className="mb-4">
        <CardElement
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Pay Now
      </button>
    </form>
  );
};

const WrappedPaymentForm = (props: PaymentFormProps) => (
  <Elements stripe={stripePromise}>
    <PaymentForm {...props} />
  </Elements>
);

export default WrappedPaymentForm;
