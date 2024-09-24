import React, { useState } from 'react';

interface Address {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
}

const CheckoutForm: React.FC<{ onSubmit: (address: Address) => void }> = ({ onSubmit }) => {
    const [address, setAddress] = useState<Address>({
        name: '',
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm(address)) {
            onSubmit(address);
        } else {
            alert('Please fill out all fields correctly.');
        }
    };

    const validateForm = (address: Address) => {
        return Object.values(address).every(value => value.trim() !== '');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-2 max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Full Name'
                    onChange={handleChange}
                    value={address.name}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    placeholder='Street Address'
                    onChange={handleChange}
                    value={address.street}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder='City'
                    onChange={handleChange}
                    value={address.city}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder='State'
                    onChange={handleChange}
                    value={address.state}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
                <input
                    type="text"
                    id="zip"
                    name="zip"
                    placeholder='Zip Code'
                    onChange={handleChange}
                    value={address.zip}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type='submit'
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Process to Payment
            </button>
        </form>
    );
};

export default CheckoutForm;
