'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
    _id: string,
    name: string,
    description: string,
    price: number,
    category: string
}

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
                console.error('Error fetching products:', error)
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        const filteredProducts = products.filter((product) => 
            product.name.toLowerCase().includes(item.toLowerCase()) &&
            (selectedCategory === '' || product.category === selectedCategory) && 
            (product.price >= Number(lowerPrice)) && 
            (product.price <= Number(upperPrice))
        );
        setSearchResults(filteredProducts);
    };

    return (
        <div>
            <div>
                <h1>Search</h1>
                <input  
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Find by name..."
                />
                <button onClick={handleSearch}>Search</button>
                <div>
                    <h1>Filters</h1>
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Computers">Computers</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Photography">Photography</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Sports">Sports</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Transportation">Transportation</option>
                    </select>
                </div>
                <div>
                    <h1>By Price</h1>
                    <input 
                        type="number"
                        value={lowerPrice}
                        onChange={(e) => setLowerPrice(e.target.value)}
                    />
                    <label>From $</label>
                    <input 
                        type="number" 
                        value={upperPrice}
                        onChange={(e) => setUpperPrice(e.target.value)}
                    />
                    <label>To $</label>
                </div>
                <div>
                    <h1>Search Results</h1>
                    {searchResults.length > 0 ? (
                        searchResults.map(product => (
                            <div key={product._id} className="border p-4 rounded-lg shadow-sm my-2">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <h4>${product.price.toFixed(2)}</h4>
                            </div>
                        ))
                    ) : (
                        <p>No results found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchItem;