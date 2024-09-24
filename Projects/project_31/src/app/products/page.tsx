'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Product } from '@/types/Product';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchProducts();
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-gray-600">Checking session...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className=" mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-8">Products</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6 p-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              quantity={product.quantity}
              inStock={product.inStock}
            />
          ))}
        </div>

        <div className="text-center my-8">
          <Link
            href="/cart"
            className="inline-block bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            Go to Cart
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Products;
