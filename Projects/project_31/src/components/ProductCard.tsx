'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/Product';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard: React.FC<Product> = ({ _id, name, description, price, category, quantity, inStock }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            _id,
            name,
            description,
            price,
            category,
            quantity,
            inStock
        });
    };

    return (
        <div className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow flex flex-col justify-between h-full space-y-4">
            <div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
            </div>
            <hr />
            <div className="flex flex-col space-y-1 mb-4">
                <p className="text-lg font-semibold text-gray-800">${price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Category: {category}</p>
            </div>
            <div>
                <p className={`text-base font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </p>
            </div>
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
                <Link
                    href={`/product/${_id}`}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                >
                    View Details
                </Link>
                <button
                    onClick={handleAddToCart}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                    disabled={!inStock}
                >
                    <FaShoppingCart className="mr-2" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
