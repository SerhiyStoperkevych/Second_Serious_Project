'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from '@/types/Product';
import SearchResults from './SearchResults';
import SearchName from './SearchName';
import SearchPrice from "./SearchPrice";

const SearchItem: React.FC = () => {
    const [item, setItem] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [lowerPrice, setLowerPrice] = useState<string>('');
    const [upperPrice, setUpperPrice] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        const filteredProducts = products.filter((product) =>
            product.name.toLowerCase().includes(item.toLowerCase()) &&
            (selectedCategory === '' || product.category === selectedCategory) &&
            (product.price >= Number(lowerPrice || '0')) &&
            (upperPrice === '' || product.price <= Number(upperPrice))
        );
        setSearchResults(filteredProducts);
    };

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md w-full space-y-6">
            <div className="flex flex-wrap gap-6 justify-center">
                <SearchName
                    item={item}
                    setItem={setItem}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <div className="mt-6">
                    <SearchResults searchResults={searchResults} handleSearch={handleSearch} />
                </div>
                <SearchPrice
                    lowerPrice={lowerPrice}
                    setLowerPrice={setLowerPrice}
                    upperPrice={upperPrice}
                    setUpperPrice={setUpperPrice}
                />
            </div>
        </div>
    );
};

export default SearchItem;
