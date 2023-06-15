import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import MovieDetailsPage from "./pages/Details";
import Layout from "./layout/Layout";
import PopularMovies from "./pages/Popular";
import UpcomingPage from "./pages/Upcoming";
import TopRatedPage from "./pages/TopRated";
import NowPlayingPage from "./pages/NowPlaying";
import SearchPage from "./pages/Search";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetailsPage />,
      },
      {
        path: "/movies/popular",
        element: <PopularMovies />,
      },
      {
        path: "/movies/upcoming",
        element: <UpcomingPage />,
      },
      {
        path: "/movies/top-rated",
        element: <TopRatedPage />,
      },
      {
        path: "/movies/now-playing",
        element: <NowPlayingPage />,
      },
      {
        path: "/movies/search",
        element: <SearchPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
