'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/Product';
import { FaShoppingCart } from 'react-icons/fa';

interface SearchResultsProps {
    searchResults: Product[];
    handleSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, handleSearch }) => {
    const { addToCart } = useCart();

    return (
        <div className="mt-4 text-center">
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
            >
                Search Results
            </button>
            {searchResults.length > 0 ? (
                <div
                    className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-4 shadow-md"
                    style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
                >
                    <div className="grid grid-cols-1 gap-4">
                        {searchResults.map((product) => (
                            <div key={product._id} className="border p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <h4 className="text-lg font-semibold">${product.price.toFixed(2)}</h4>
                                <button
                                    onClick={() => addToCart(product)} // Call addToCart with the product
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                                    disabled={!product.inStock}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No results found</p>
            )}
        </div>
    );
};

export default SearchResults;
