'use client'; // This makes the entire component a Client Component

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';

const About: React.FC = () => {
  const { status } = useSession(); // Use client-side hook here

  return (
    <>
      <Header/>
      <Head>
        <title>About Us | YourStore</title>
        <meta name="description" content="Learn more about YourStore and our mission." />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to YourStore! We are dedicated to providing the best products and services to our customers. Our mission is to offer high-quality products at affordable prices while ensuring an exceptional shopping experience.
        </p>
        <p className="mb-4">
          Our team is passionate about curating a selection of items that cater to your needs and preferences. We believe in building long-lasting relationships with our customers by delivering outstanding service and support.
        </p>
        <p className="mb-4">
          Thank you for choosing YourStore. If you have any questions or need assistance, feel free to <Link href="/contact" className="text-blue-500 hover:underline">contact us</Link>.
        </p>
        <Link
          className="flex flex-col items-center rounded-lg shadow-lg px-4 py-2 my-6 text-gray-100 hover:text-gray-800 bg-blue-500 hover:bg-blue-300"
          href={status === 'authenticated' ? '/home' : '/'}
        >
          Back
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default About;
