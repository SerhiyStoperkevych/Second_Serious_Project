import React from 'react'
import Link from 'next/link'

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">E-Commerce Portfolio Project</h1>
        <Link href="/signin" className="block w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-600">
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default Home
