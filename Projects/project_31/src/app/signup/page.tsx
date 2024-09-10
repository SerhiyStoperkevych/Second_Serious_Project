'use client';

import SignUp from '@/components/SignUp'
import React from 'react'
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <SignUp />
                <button
                    onClick={() => router.push("/signin")}
                    className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default Page
