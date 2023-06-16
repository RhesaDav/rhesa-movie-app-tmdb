import React, { Fragment, useState } from "react";
import { useGetGenres, useSearchMovies } from "../service";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/common/Searchbar";
import Pagination from "../components/common/Pagination";
import { useLocation } from "react-router-dom";
import { Movies } from "../models/Movies";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title") || "";
  const year = searchParams.get("year") || "2023";
  const includeAdult = searchParams.get("includeAdult") || "no";

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useSearchMovies(
    title,
    includeAdult,
    year,
    currentPage
  );
  const { data: genres } = useGetGenres();
  const [movies, setMovies] = useState<Movies["results"]>(
    data?.data.results ?? []
  );

  const loadNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const loadPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  React.useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  React.useEffect(() => {
    setMovies(data?.data.results ?? []);
  }, [data]);

  return (
    <Fragment>
      <h1 className="text-3xl font-bold mb-4">Search Movies</h1>
      <MovieSearch />
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : movies.length > 0 ? (
        <>
          <Pagination
            totalPages={data?.data.total_pages || 0}
            currentPage={currentPage}
            loadNextPage={loadNextPage}
            loadPrevPage={loadPrevPage}
          />
          <h1 className="text-gray-700 font-extrabold text-2xl my-2">
            Looking movie "{title}" at year {year}{" "}
            {includeAdult === "yes" ? "and include adult" : ""}
          </h1>
          <MovieList genre={genres?.data.genres || []} movies={movies} />
          <Pagination
            totalPages={data?.data.total_pages || 0}
            currentPage={currentPage}
            loadNextPage={loadNextPage}
            loadPrevPage={loadPrevPage}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">No movies found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default SearchPage;
