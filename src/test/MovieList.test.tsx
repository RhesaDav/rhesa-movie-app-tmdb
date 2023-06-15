/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { Movies } from '../models/Movies';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('MovieList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const movies: Movies['results'] = [
    {
      adult: false,
      backdrop_path: '/2e7fc8eNwLXZ5Uvehvl3xj8wVyv.jpg',
      genre_ids: [28, 80, 53],
      id: 385687,
      original_language: 'en',
      original_title: 'Fast X',
      overview:
        "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
      popularity: 13114.65,
      poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      release_date: '2023-05-17',
      title: 'Fast X',
      video: false,
      vote_average: 7.4,
      vote_count: 1475,
    },
    {
      adult: false,
      backdrop_path: '/fgw4rFs4XMWdJTWp1eMacHKQqbZ.jpg',
      genre_ids: [28, 53, 80],
      id: 603692,
      original_language: 'en',
      original_title: 'John Wick: Chapter 4',
      overview:
        'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
      popularity: 3286.587,
      poster_path: '/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
      release_date: '2023-03-22',
      title: 'John Wick: Chapter 4',
      video: false,
      vote_average: 7.9,
      vote_count: 2960,
    },
  ];

  const genres = [
    { id: 28, name: 'Action' },
    { id: 80, name: 'Crime' },
    { id: 53, name: 'Thriller' },
  ];

  test('renders without error', () => {
    render(<MovieList movies={movies} genre={genres} />);
  });

  test('renders "No movies found." when no movies are available', () => {
    const { getByText } = render(<MovieList movies={[]} genre={genres} />);
    const noMoviesText = getByText('No movies found.');
    expect(noMoviesText).toBeInTheDocument();
  });

  test('renders movie items correctly', () => {
    const { getByText, getByAltText } = render(
      <MovieList movies={movies} genre={genres} />
    );
  
    expect(getByText('Fast X')).toBeInTheDocument();
    expect(getByText('John Wick: Chapter 4')).toBeInTheDocument();
  
    expect(getByAltText('Fast X')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg'
    );
    expect(getByAltText('John Wick: Chapter 4')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg'
    );
  
    expect(getByText('Release Date: 2023-05-17')).toBeInTheDocument();
    expect(getByText('Release Date: 2023-03-22')).toBeInTheDocument();
  });
  

  test('navigates to movie details page when a movie item is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { getByText } = render(
      <MovieList movies={movies} genre={genres} />
    );
    const movieItem = getByText('Fast X');
    fireEvent.click(movieItem);

    expect(navigate).toHaveBeenCalledWith('/movies/385687');
  });
});
