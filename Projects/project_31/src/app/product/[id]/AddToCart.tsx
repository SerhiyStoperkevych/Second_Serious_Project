import React from 'react';
import { CartItem } from '@/types/CartItem';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/Product';

interface AddToCartProps {
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
  const { addToCart } = useCart();

  const productForCart: CartItem = {
    _id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    quantity: product.quantity,
    inStock: product.inStock
  };

  const handleAddToCart = () => {
    addToCart(productForCart);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
    >
      Add to Cart
    </button>
  );
};

export default AddToCart;
