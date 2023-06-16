import React, { Fragment, useState } from "react";
import { useGetGenres, useGetTrendingMovies } from "../service";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/common/Searchbar";
import Pagination from "../components/common/Pagination";
import { Movies } from "../models/Movies";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
    refetch,
    error: movieError,
  } = useGetTrendingMovies(currentPage);
  const { data: genres } = useGetGenres();
  const [movies, setMovies] = useState<Movies["results"]>([]);

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
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <MovieSearch />
      <Pagination
        totalPages={data?.total_pages || 0}
        currentPage={currentPage}
        loadNextPage={loadNextPage}
        loadPrevPage={loadPrevPage}
      />
      <MovieList
        genre={genres?.genres || []}
        movies={movies}
        error={!!movieError}
        loading={isLoading}
      />
      <Pagination
        totalPages={data?.total_pages || 0}
        currentPage={currentPage}
        loadNextPage={loadNextPage}
        loadPrevPage={loadPrevPage}
      />
    </Fragment>
  );
};

export default Home;
