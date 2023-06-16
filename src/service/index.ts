import { AxiosResponse } from "axios";
import { Movies } from "../models/Movies";
import { Genre } from "../models/Genre";
import { axiosInstance } from "../api/axiosInstance";
import { Detail } from "../models/Detail";
import { useQuery } from "react-query";

export const searchMovies = async (
  title: string,
  includeAdult?: string,
  year?: string,
  page?: number
): Promise<AxiosResponse<Movies>> => {
  const params: any = {
    query: encodeURIComponent(title),
  };
  console.log(params);

  if (includeAdult) {
    params.include_adult = includeAdult;
  }

  if (year) {
    params.year = year;
  }

  if (page) {
    params.page = page;
  }
  try {
    const response: AxiosResponse<Movies> = await axiosInstance.get(
      "/search/movie",
      {
        params: params,
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getGenres = async (): Promise<AxiosResponse<Genre>> => {
  try {
    const response: AxiosResponse<Genre> = await axiosInstance.get(
      "/genre/movie/list"
    );
    return response;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getPopularMovies = async (
  page = 1
): Promise<AxiosResponse<Movies>> => {
  try {
    const response: AxiosResponse<Movies> = await axiosInstance.get(
      "/movie/popular",
      {
        params: {
          language: "en-US",
          page: page,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getTopRatedMovies = async (
  page = 1
): Promise<AxiosResponse<Movies>> => {
  try {
    const response: AxiosResponse<Movies> = await axiosInstance.get(
      "/movie/top_rated",
      {
        params: {
          language: "en-US",
          page: page,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getUpcomingMovies = async (
  page = 1
): Promise<AxiosResponse<Movies>> => {
  try {
    const response: AxiosResponse<Movies> = await axiosInstance.get(
      "/movie/upcoming",
      {
        params: {
          language: "en-US",
          page: page,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getTrendingMovies = async (
  page = 1
): Promise<AxiosResponse<Movies>> => {
  try {
    const response: AxiosResponse<Movies> = await axiosInstance.get(
      "/trending/movie/day?language=en-US",
      {
        params: {
          language: "en-US",
          page: page,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getNowPlayingMovies = async (
  page = 1
): Promise<AxiosResponse<Movies>> => {
  try {
    const response: AxiosResponse<Movies> = await axiosInstance.get(
      "/movie/now_playing",
      {
        params: {
          language: "en-US",
          page: page,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (
  movieId: number
): Promise<AxiosResponse<Detail>> => {
  try {
    const url = `/movie/${movieId}?language=en-US`;
    const response: AxiosResponse<Detail> = await axiosInstance.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching detail movies:", error);
    throw error;
  }
};

//use query

export const useSearchMovies = (
  title: string,
  includeAdult?: string,
  year?: string,
  page?: number
) => {
  return useQuery<AxiosResponse<Movies>, Error>("searchMovies", async () => {
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
  return useQuery<AxiosResponse<Genre>, Error>("getGenres", async () => {
    const response = await axiosInstance.get("/genre/movie/list");
    return response.data;
  });
};

export const useGetPopularMovies = (page = 1) => {
  return useQuery<AxiosResponse<Movies>, Error>(
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
  return useQuery<AxiosResponse<Movies>, Error>(
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
  return useQuery<AxiosResponse<Movies>, Error>(
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
  return useQuery<AxiosResponse<Movies>, Error>(
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
  return useQuery<AxiosResponse<Movies>, Error>(
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
  return useQuery<AxiosResponse<Detail>, Error>("getMovieDetails", async () => {
    const url = `/movie/${movieId}?language=en-US`;
    const response = await axiosInstance.get(url);

    return response.data;
  });
};
