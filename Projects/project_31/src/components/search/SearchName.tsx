import React, { useState } from 'react';

interface SearchNameProps {
    item: string;
    setItem: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
}

const SearchName: React.FC<SearchNameProps> = ({
    item,
    setItem,
    selectedCategory,
    setSelectedCategory,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold mr-4">Search By Name:</h1>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="text-lg font-medium bg-gray-200 px-4 py-1 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                    {isVisible ? 'Hide' : 'Show'}
                </button>
            </div>

            {isVisible && (
                <div className="mt-4">
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="Find by name..."
                        className="border p-2 rounded-lg mb-2 w-full"
                    />
                    <div className="mt-4">
                        <h2 className="text-lg font-medium">Category:</h2>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border p-2 rounded-lg w-full mt-2"
                        >
                            <option value="">All Categories</option>
                            {/* Add more options as needed */}
                            <option value="Electronics">Electronics</option>
                            <option value="Computers">Computers</option>
                            {/* ... */}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchName;