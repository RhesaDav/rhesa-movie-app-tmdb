import React, { Fragment, useState } from "react";
import { useGetGenres, useGetNowPlayingMovies } from "../service";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/common/Searchbar";
import Pagination from "../components/common/Pagination";
import { Movies } from "../models/Movies";

const NowPlayingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetNowPlayingMovies(currentPage);
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
      <h1 className="text-3xl font-bold mb-4">Now Playing Movies</h1>
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

export default NowPlayingPage;
