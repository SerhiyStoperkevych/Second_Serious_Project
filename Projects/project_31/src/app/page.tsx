import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow p-6 bg-gray-100">
        <div className="w-full max-w-screen-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">E-Commerce Portfolio Project</h1>
          <Link href="/signin" className='flex flex-col items-center bg-blue-500 font-bold text-xl text-gray-100 rounded-lg shadow-lg py-2 px-4 hover:bg-blue-300 hover:text-gray-800'>
            Get Started
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
