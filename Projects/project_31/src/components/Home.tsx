import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Header />
      <section className="bg-blue-600 text-white py-20">
        <div className="mx-auto max-w-custom px-4 text-center"> {/* Use your custom class */}
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Our E-Commerce Store!
          </h1>
          <p className="text-lg mb-8">
            Discover the best products at unbeatable prices. Shop now and enjoy exclusive deals!
          </p>
          <Link
            href="/products"
            className="inline-block py-2 px-4 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
            aria-label="Shop now"
          >
            Shop Now
          </Link>
        </div>
      </section>
      <Footer />
    </>

  );
};

export default Home;
