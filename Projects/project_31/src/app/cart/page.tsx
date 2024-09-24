'use client';

import React from 'react';
import Cart from '@/components/Cart';
import axios from 'axios';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const CartPage: React.FC = () => {
  const router = useRouter();
  const { cart } = useCart(); // Retrieve cart items from context or state

  const handleCheckout = async (total: number) => {
    console.log("Checkout total:", total);

    try {
      // Collect user data
      const userId = "user-id"; // Example user id

      const cartItems = cart.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      // Send order and payment data to the backend
      const response = await axios.post('/api/orders', {
        userId,
        cartItems,
        totalAmount: total,
      });

      const paymentIntent = response.data.paymentIntent;
      console.log("Payment intent created:", paymentIntent);

      // Redirect to confirmation page
      router.push('/order-confirmation');
    } catch (error) {
      console.error("Checkout error:", error);
      // Optionally show an error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="py-8">
        <Cart onCheckout={handleCheckout} />
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
