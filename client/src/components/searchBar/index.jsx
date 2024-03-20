import React, { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("posts"); // Default selected option
  const [searchPerformed, setSearchPerformed] = useState(false);

  const searchInputRef = useRef(null);


  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    searchInputRef.current.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery, selectedOption);
    setSearchPerformed(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3 w-2/3 md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto pt-2">
      <div className="flex items-stretch mb-2">
        <input
        ref={searchInputRef}
          type="search"
          value={searchQuery}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-primary"
          placeholder="Search"
          aria-label="Search"
        />
        <button type="submit" className="flex items-center bg-gray-200 rounded-r-md px-4 text-gray-500 focus:outline-none">
          <FiSearch />
        </button>
      </div>
      {searchPerformed && ( // Render button row only if search has been performed
        <div className="flex items-center justify-center mt-2">
          <div className="mr-2 text-gray-600">Filter:</div>
          <div className="flex">
            <button
              type="button"
              className={`mr-2 px-3 py-1 rounded-md focus:outline-none ${selectedOption === 'posts' ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionChange('posts')}
            >
              Posts
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-md focus:outline-none ${selectedOption === 'people' ? 'bg-gray-200' : ''}`}
              onClick={() => handleOptionChange('people')}
            >
              People
            </button>
            {/* Add more filter options as needed */}
          </div>
        </div>
      )}
    </form>
  );
}
