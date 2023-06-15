import React from 'react';
import { Movies } from '../models/Movies';
import { Genre } from '../models/Genre';
import { useNavigate } from 'react-router-dom';

interface MovieListProps {
  movies: Movies['results'];
  genre: Genre['genres'];
}

const MovieList: React.FC<MovieListProps> = ({ movies, genre }) => {
  const navigate = useNavigate()

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => {
        const movieGenres = movie.genre_ids.map((genreId) => {
          const genreFind = genre.find((item:any) => item.id === genreId);
          return genreFind ? genreFind.name : "Unknown Genre";
        });

        return (
          <div key={movie.id} onClick={() => navigate(`/movies/${movie.id}`)} className="flex flex-col items-center bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-md object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full rounded-md bg-gray-300 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600">Image Not Available</p>
                <p className="mt-2 text-center text-gray-800 font-medium truncate">{movie.title}</p>
              </div>
            )}
            <p className="mt-2 text-center text-gray-800 font-medium truncate w-full">{movie.title}</p>
            <div className="flex flex-wrap mt-1">
              {movieGenres.map((genre) => (
                <div
                  key={genre}
                  className="bg-blue-500 text-white font-semibold py-1 px-2 rounded-full text-xs mr-1 mb-1"
                >
                  {genre}
                </div>
              ))}
            </div>
            <p className="mt-1 text-sm text-gray-500">Release Date: {movie.release_date}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
