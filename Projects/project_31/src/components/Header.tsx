'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import SearchItem from './search/SearchItem';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between items-center">
        {/* Brand and Navigation */}
        <div className="flex flex-col md:flex-row md:items-center w-full">
          <h1 className="text-3xl font-bold text-blue-600">
            <Link href="/home">E-Commerce</Link>
          </h1>
          <nav className="flex space-x-4 mt-4 md:mt-0 md:ml-8">
            <Link
              href="/home"
              className={`${
                pathname === '/home' ? 'font-bold text-blue-600' : 'text-gray-700'
              } hover:text-blue-500 transition duration-300`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`${
                pathname === '/products' ? 'font-bold text-blue-600' : 'text-gray-700'
              } hover:text-blue-500 transition duration-300`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className={`${
                pathname === '/about' ? 'font-bold text-blue-600' : 'text-gray-700'
              } hover:text-blue-500 transition duration-300`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`${
                pathname === '/contact' ? 'font-bold text-blue-600' : 'text-gray-700'
              } hover:text-blue-500 transition duration-300`}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Auth and Search */}
        <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {status === 'authenticated' ? (
              <>
                <span className="text-gray-700">Welcome, {session?.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Full-width SearchItem Container */}
      <div className="w-full px-4 py-4 bg-gray-50 border-t border-gray-300">
        <SearchItem />
      </div>
    </header>
  );
};

export default Header;
