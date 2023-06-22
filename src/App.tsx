import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./layout/Layout";

const Home = React.lazy(() => import("./pages/Home"));
const PopularMovies = React.lazy(() => import("./pages/Popular"));
const UpcomingPage = React.lazy(() => import("./pages/Upcoming"));
const TopRatedPage = React.lazy(() => import("./pages/TopRated"));
const NowPlayingPage = React.lazy(() => import("./pages/NowPlaying"));
const SearchPage = React.lazy(() => import("./pages/Search"));
const DetailsPage = React.lazy(() => import("./pages/Details"));

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      {/* <RouterProvider router={router} /> */}
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<div>Loading Page ...</div>}>
                  <Home />
                </React.Suspense>
              }
            />
            <Route
              path="/movies/:id"
              element={
                <React.Suspense fallback={<div>Loading Page ...</div>}>
                  <DetailsPage />
                </React.Suspense>
              }
            />
            <Route
              path="/movies/popular"
              element={
                <React.Suspense fallback={<div>Loading Page ...</div>}>
                  <PopularMovies />
                </React.Suspense>
              }
            />
            <Route
              path="/movies/upcoming"
              element={
                <React.Suspense fallback={<div>Loading Page ...</div>}>
                  <UpcomingPage />
                </React.Suspense>
              }
            />
            <Route
              path="/movies/top-rated"
              element={
                <React.Suspense fallback={<div>Loading Page ...</div>}>
                  <TopRatedPage />
                </React.Suspense>
              }
            />
            <Route
              path="/movies/now-playing"
              element={
                <React.Suspense fallback={<div>Loading Page ...</div>}>
                  <NowPlayingPage />
                </React.Suspense>
              }
            />
            <Route
              path="/movies/search"
              element={
                <React.Suspense fallback={<div>Loading Page ...</div>}>
                  <SearchPage />
                </React.Suspense>
              }
            />
          </Routes>
        </QueryClientProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
