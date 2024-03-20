import React from 'react';

const PaginationFooter = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-footer flex items-center justify-center mt-6 pb-[8vh] sm:pb-[4vh]">
      <button 
        className={`px-4 py-2 bg-gray-500 text-white rounded ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
        }`}
        onClick={handlePrevPage} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="mx-4 text-lg font-semibold">Page {currentPage} of {totalPages}</span>
      <button 
        className={`px-4 py-2 bg-gray-500 text-white rounded ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
        }`}
        onClick={handleNextPage} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationFooter;
