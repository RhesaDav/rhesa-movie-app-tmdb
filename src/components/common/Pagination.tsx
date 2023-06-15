import React from "react";

interface Props {
    currentPage: number;
    loadPrevPage: () => void;
    loadNextPage: () => void;
    totalPages: number;
}

const Pagination: React.FC<Props> = ({currentPage,loadNextPage,loadPrevPage, totalPages}) => {
  return (
    <div className="flex items-center justify-between mt-4 my-4">
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={loadPrevPage}
        disabled={currentPage === 1}
      >
        Prev Page
      </button>
      <h1 className="text-gray-500 font-extrabold text-2xl">Pages : {currentPage}</h1>
      <button
        className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={loadNextPage}
        disabled={currentPage === totalPages }
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
