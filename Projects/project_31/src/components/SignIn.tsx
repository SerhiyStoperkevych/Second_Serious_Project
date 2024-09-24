'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import Footer from './Footer';

export default function SignIn() {
  const [email, setEmail] = useState('');    
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/home');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (response?.ok) {
      router.push('/home');
    } else {
      console.log('Sign-in failed');
    }
  };

  const handleGoogle = async () => {
    const response = await signIn('google', { redirect: false });

    if (response?.ok) {
      router.push('/home');
    } else {
      console.log('Google sign-in failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={() => router.push('/signup')}
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
        <hr className="my-6" />
        {status === 'unauthenticated' ? (
          <>
            <p className="text-center text-gray-500 mb-4">Not signed in</p>
            <button
              onClick={handleGoogle}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <p className="text-center text-gray-500 mb-4">Signed in as {session?.user?.name}</p>
            <button
              onClick={() => signOut()}
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition duration-200"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
