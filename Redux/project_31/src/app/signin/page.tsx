'use client';

import React from 'react';
import SignIn from '@/components/SignIn';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        <SignIn />
        <button onClick={() => router.push('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default Page;
