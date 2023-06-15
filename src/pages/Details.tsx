import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovieDetails } from '../service';

const DetailsPage: React.FC = () => {
  const { id } = useParams<string>();
  const { data: movie, isLoading } = useQuery(['movieDetails', id], () => getMovieDetails(Number(id)));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {movie && (
        <div className="">
        <div className="w-full">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.data.backdrop_path}`}
            alt={movie.data.title}
            className="w-full h-96 rounded-lg object-cover"
          />
        </div>
        <h2 className="text-4xl text-center font-bold my-4">{movie.data.title}</h2>
        <ul className="mb-4 flex items-center justify-center">
          {movie.data.genres.map((item, index) => (
            <li
              key={index}
              className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="flex md:flex-row flex-col">
          <div className="w-2/4">
            <p className="mb-2">
              <strong>Release Date:</strong> {movie.data.release_date}
            </p>
            <div className="">
              <p className="text-gray-800 mb-4">
                <strong>Production Companies :</strong>
              </p>
              <ul>
              {movie.data.production_companies.map((item, index) => (
                <li className="text-gray-800 my-2">{index+1 + '. ' +item.name}</li>
              ))}
              </ul>
            </div>
            <div className="flex flex-col"></div>
          </div>
          <div className="ml-6">
            <p className="text-gray-800 mb-4 text-start">{movie.data.overview}</p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default DetailsPage;
