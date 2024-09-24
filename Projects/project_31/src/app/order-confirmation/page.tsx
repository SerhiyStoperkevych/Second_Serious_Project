import React from 'react';
import Checkout from '@/components/Checkout';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Confirmation</h1>
        <p className="text-lg mb-6 text-gray-600">
          Thank you for your purchase!
        </p>
        <Checkout />
      </div>
    </div>
  );
};

export default OrderConfirmation;
