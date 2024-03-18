import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  return (
    <div className="mb-3 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto pt-2">
      <div className="relative flex items-stretch">
        <input
          type="search"
          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-primary"
          placeholder="Search"
          aria-label="Search"
        />
        <span className="flex items-center bg-gray-200 rounded-r-md px-4 text-gray-500">
          <FiSearch />
        </span>
      </div>
    </div>
  );
}
