import React from 'react';
import { Movies } from '../models/Movies';
import { Genre } from '../models/Genre';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movies['results'];
  genre: Genre['genres'];
  loading?: boolean;
  error?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, genre, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-600">Error fetching movies. Please try again later.</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genre={genre} />
      ))}
    </div>
  );
};

export default MovieList;
