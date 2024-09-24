'use client';

import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';

const Contact: React.FC = () => {

  const { status } = useSession(); // Use client-side hook here

  return (
    <>
      <Header/>
      <Head>
        <title>Contact Us | YourStore</title>
        <meta name="description" content="Get in touch with YourStore's support team." />
      </Head>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-4">
          We’d love to hear from you! If you have any questions, comments, or need assistance, please reach out to us using the contact form below or through the following contact details:
        </p>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Email</h2>
          <p className="text-blue-500">support@yourstore.com</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Phone</h2>
          <p>(123) 456-7890</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Address</h2>
          <p>123 YourStore Ave, Suite 100<br />City, State, 12345</p>
        </div>
        <form className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Contact Form</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full p-2 border border-gray-300 rounded" required></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Send Message</button>
        </form>
        <Link
          className="flex flex-col items-center rounded-lg shadow-lg px-4 py-2 my-6 text-gray-100 hover:text-gray-800 bg-blue-500 hover:bg-blue-300"
          href={status === 'authenticated' ? '/home' : '/'}
        >
          Back
        </Link>
      </main>
      <Footer/>
    </>
  );
};

export default Contact;
