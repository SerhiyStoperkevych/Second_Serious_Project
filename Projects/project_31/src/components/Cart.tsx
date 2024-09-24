'use client';

import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import Link from 'next/link';

const Cart = ({ onCheckout }: { onCheckout: (total: number) => void }) => {
  const { cart, setCart, total, setTotal, qua, setQua } = useCart();

  // Recalculate the total cost based on quantities
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => {
      return sum + item.price * (qua[item._id] || 0);
    }, 0);
    setTotal(newTotal);
  }, [cart, setTotal, qua]);

  // Handle quantity change for a specific item
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setQua((prevQua) => ({
      ...prevQua,
      [itemId]: newQuantity,
    }));
  };

  const handleCheckout = () => {
    onCheckout(total); // Pass the total to the parent component (Checkout)
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border p-4 rounded-lg bg-gray-50 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-500 mt-1">Description: {item.description}</p>
                <p className="text-gray-700 mt-1">
                  ${item.price.toFixed(2)} x 
                  <input
                    type="number"
                    value={qua[item._id] || 0}
                    onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                    min={0}
                    max={item.quantity}
                    className="ml-2 border p-1 rounded-md w-16 text-center"
                    aria-label={`Quantity for ${item.name}`}
                  />
                  = ${(item.price * (qua[item._id] || 0)).toFixed(2)}
                </p>
              </div>
              <div className="text-gray-700">
                <p className="text-lg font-bold">
                  ${ (item.price * (qua[item._id] || 0)).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Total Cost: ${total.toFixed(2)}</h2>
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        <Link href="/products" className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors">
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default Cart;
