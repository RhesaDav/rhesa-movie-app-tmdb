import { AxiosResponse } from "axios";
import { Movies } from "../models/Movies";
import { Genre } from "../models/Genre";
import { axiosInstance } from "../api/axiosInstance";
import { Detail } from "../models/Detail";
import { useQuery } from "react-query";

export const useSearchMovies = (
  title: string,
  includeAdult?: string,
  year?: string,
  page?: number
) => {
  return useQuery<Movies, Error>("searchMovies", async () => {
    const params: any = {
      query: encodeURIComponent(title),
    };

    if (includeAdult) {
      params.include_adult = includeAdult;
    }

    if (year) {
      params.year = year;
    }

    if (page) {
      params.page = page;
    }

    const response = await axiosInstance.get("/search/movie", {
      params: params,
    });

    return response.data;
  });
};

export const useGetGenres = () => {
  return useQuery<Genre, Error>("getGenres", async () => {
    const response = await axiosInstance.get("/genre/movie/list");
    return response.data;
  });
};

export const useGetPopularMovies = (page = 1) => {
  return useQuery<Movies, Error>(
    "getPopularMovies",
    async () => {
      const response = await axiosInstance.get("/movie/popular", {
        params: {
          language: "en-US",
          page: page,
        },
      });

      return response.data;
    }
  );
};

export const useGetTopRatedMovies = (page = 1) => {
  return useQuery<Movies, Error>(
    "getTopRatedMovies",
    async () => {
      const response = await axiosInstance.get("/movie/top_rated", {
        params: {
          language: "en-US",
          page: page,
        },
      });

      return response.data;
    }
  );
};

export const useGetUpcomingMovies = (page = 1) => {
  return useQuery<Movies, Error>(
    "getUpcomingMovies",
    async () => {
      const response = await axiosInstance.get("/movie/upcoming", {
        params: {
          language: "en-US",
          page: page,
        },
      });

      return response.data;
    }
  );
};

export const useGetTrendingMovies = (page = 1) => {
  return useQuery<Movies, Error>(
    "getTrendingMovies",
    async () => {
      const response = await axiosInstance.get(
        "/trending/movie/day?language=en-US",
        {
          params: {
            language: "en-US",
            page: page,
          },
        }
      );

      return response.data;
    }
  );
};

export const useGetNowPlayingMovies = (page = 1) => {
  return useQuery<Movies, Error>(
    "getNowPlayingMovies",
    async () => {
      const response = await axiosInstance.get("/movie/now_playing", {
        params: {
          language: "en-US",
          page: page,
        },
      });

      return response.data;
    }
  );
};

export const useGetMovieDetails = (movieId: number) => {
  return useQuery<Detail, Error>("getMovieDetails", async () => {
    const url = `/movie/${movieId}?language=en-US`;
    const response = await axiosInstance.get(url);

    return response.data;
  });
};
