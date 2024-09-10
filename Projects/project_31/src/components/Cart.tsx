'use client';

import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cart, setCart, total, setTotal } = useCart();

  const handleDelete = (itemId: string) => {
    const itemToRemove = cart.find((item) => item._id === itemId);
    if (itemToRemove) {
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
      setTotal((prevTotal) => prevTotal - itemToRemove.price);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="border p-4">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <p>Description: {item.description}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      <h2>Total Cost: ${total.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
