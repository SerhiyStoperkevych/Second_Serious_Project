import React, { useState } from 'react';

interface SearchPriceProps {
    lowerPrice: string;
    upperPrice: string;
    setLowerPrice: React.Dispatch<React.SetStateAction<string>>;
    setUpperPrice: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPrice: React.FC<SearchPriceProps> = ({ lowerPrice, setLowerPrice, upperPrice, setUpperPrice }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold mr-4">Search By Price:</h1>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="text-lg font-medium bg-gray-200 px-4 py-1 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                    {isVisible ? 'Hide' : 'Show'}
                </button>
            </div>

            {isVisible && (
                <div className="mt-4 space-y-2">
                    <label className="flex items-center space-x-2">
                        <span>From $</span>
                        <input
                            type="number"
                            value={lowerPrice}
                            onChange={(e) => setLowerPrice(e.target.value)}
                            className="border p-2 rounded-lg"
                            placeholder="Min Price"
                        />
                    </label>
                    <label className="flex items-center space-x-2">
                        <span>To $</span>
                        <input
                            type="number"
                            value={upperPrice}
                            onChange={(e) => setUpperPrice(e.target.value)}
                            className="border p-2 rounded-lg"
                            placeholder="Max Price"
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default SearchPrice;