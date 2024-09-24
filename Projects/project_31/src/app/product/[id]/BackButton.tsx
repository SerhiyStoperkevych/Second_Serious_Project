import React from 'react';
import Link from 'next/link';

const BackButton = () => (
  <div>
    <Link href="/cart" className="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
      To the Cart
    </Link>
    <Link href="/products" className="mt-4 inline-block bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
      To the Products
    </Link>
  </div>
);

export default BackButton;
