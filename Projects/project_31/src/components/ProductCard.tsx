'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

const ProductCard: React.FC<Product> = ({ _id, name, description, price, category }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            _id,
            name,
            description,
            price,
            category
        });
    };

    return (
        <>
            <div className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{name}</h3>
                    <p className="text-gray-700 mb-4">{description}</p>
                    <p className="text-lg font-bold text-gray-800">${price.toFixed(2)}</p>
                    
                    <Link href={`/product/${_id}`}>
                        View Details
                    </Link>

                    <button
                        onClick={handleAddToCart}
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
