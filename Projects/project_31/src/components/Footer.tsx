import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Font Awesome icons

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-blue-500 text-white py-8 mt-auto shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center max-w-screen-md px-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 w-full justify-between">
          <div>
            <h1 className="text-2xl font-bold">YourStore</h1>
          </div>

          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="/about" className="font-bold text-xl hover:underline">
              About Us
            </a>
            <a href="/contact" className="font-bold text-xl hover:underline">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <p className="font-bold text-xl">Follow Us:</p>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="w-6 h-6 text-white hover:text-gray-400 cursor-pointer" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="w-6 h-6 text-white hover:text-gray-400 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="w-6 h-6 text-white hover:text-gray-400 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} YourStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
