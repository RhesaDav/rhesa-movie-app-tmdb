import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MovieSearchProps {}

const SearchBar: React.FC<MovieSearchProps> = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<string>("no");
  const [year, setYear] = useState<string>("2023");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSearch = () => {
    if (!query) {
      setErrorMessage(true);
      return;
    }

    navigate(`/movies/search?title=${encodeURIComponent(query)}&year=${year}&includeAdult=${includeAdult}`);
  };

  const startYear = 2023;
  const endYear = 1990;
  const years = Array.from({ length: startYear - endYear + 1 }, (_, index) =>
    (startYear - index).toString()
  );

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 items-center justify-center mt-4 mx-auto">
          <div className="flex col-span-2 items-center sm:justify-center justify-between">
            <label htmlFor="searchInput">Search for a movie:</label>
            <input
              type="text"
              id="searchInput"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a movie title"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-full"
            />
          </div>
          <div className="flex items-center sm:justify-center justify-between">
            <label htmlFor="includeAdult">Include Adult:</label>
            <select
              id="includeAdult"
              defaultValue={includeAdult}
              onChange={(e) => setIncludeAdult(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="flex items-center sm:justify-center justify-between">
            <label htmlFor="yearSelect">Year:</label>
            <select
              id="yearSelect"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Years</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="lg:col-span-5 sm:col-span-1 flex items-center justify-center mt-4">
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">Title is required</p>}
    </div>
  );
};

export default SearchBar;
