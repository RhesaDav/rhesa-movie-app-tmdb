import React, { Fragment, useState } from "react";
import { useQuery } from "react-query";
import {
  getGenres,
  getPopularMovies,
} from "../service";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/common/Searchbar";
import Pagination from "../components/common/Pagination";

const PopularPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading,
    refetch,
  } = useQuery(["popularMovies", currentPage], () =>
    getPopularMovies(currentPage)
  );
  const { data: genres } = useQuery("movieGenres", getGenres);

  const [movies, setMovies] = useState<any[]>(
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
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      <MovieSearch />
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading...</p>
      </div>
      ) : movies.length > 0 ? (
        <>
          <Pagination totalPages={data?.data.total_pages || 0} currentPage={currentPage} loadNextPage={loadNextPage} loadPrevPage={loadPrevPage}/>
          <MovieList genre={genres?.data.genres || []} movies={movies} />
          <Pagination totalPages={data?.data.total_pages || 0} currentPage={currentPage} loadNextPage={loadNextPage} loadPrevPage={loadPrevPage}/>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">No movies found.</p>
        </div>
      )}
    </Fragment>
  );
};

export default PopularPage;
