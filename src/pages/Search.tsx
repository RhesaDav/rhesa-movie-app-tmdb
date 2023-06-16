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
  const {
    data,
    isLoading,
    refetch,
    isError: movieError,
  } = useSearchMovies(title, includeAdult, year, currentPage);
  const { data: genres } = useGetGenres();
  const [movies, setMovies] = useState<Movies["results"]>(data?.results ?? []);

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
    setMovies(data?.results ?? []);
  }, [data]);

  return (
    <Fragment>
      <h1 className="text-3xl font-bold mb-4">Search Movies</h1>
      <MovieSearch />
      <Pagination
        totalPages={data?.total_pages || 0}
        currentPage={currentPage}
        loadNextPage={loadNextPage}
        loadPrevPage={loadPrevPage}
      />
      <h1 className="text-gray-700 font-extrabold text-2xl my-2">
        Looking movie "{title}" at year {year}{" "}
        {includeAdult === "yes" ? "and include adult" : ""}
      </h1>
      <MovieList
        genre={genres?.genres || []}
        movies={movies}
        error={!!movieError}
        loading={isLoading}
      />{" "}
      <Pagination
        totalPages={data?.total_pages || 0}
        currentPage={currentPage}
        loadNextPage={loadNextPage}
        loadPrevPage={loadPrevPage}
      />
    </Fragment>
  );
};

export default SearchPage;
