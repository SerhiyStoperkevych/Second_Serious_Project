'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchItem from '@/components/SearchItem';
import Link from 'next/link';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-lg font-semibold text-red-500">Error: {error}</div>;

    return (
        <>
        <div>
            <SearchItem/>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    _id={product._id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                />
            ))}
        </div>
        <Link href={'/cart'}>
            Cart
        </Link>
        </>
    );
};

export default Products;
