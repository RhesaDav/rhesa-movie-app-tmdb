import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex flex-col min-h-screen">
        <header className="bg-gray-800 py-4">
          <nav className="container mx-auto px-4 flex items-center justify-between">
            <Link to="/" className="text-white text-lg font-bold">
              Rhesa's Movie App
            </Link>

            <ul className="flex space-x-4 text-white">
              <li>
                <Link to="/movies/now-playing" className="hover:text-gray-300">
                  Now Playing
                </Link>
              </li>
              <li>
                <Link to="/movies/popular" className="hover:text-gray-300">
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/movies/top-rated" className="hover:text-gray-300">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/movies/upcoming" className="hover:text-gray-300">
                  Upcoming
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet/>
        </main>

        <footer className="bg-gray-800 py-4">
          <div className="container mx-auto px-4 text-center text-white">
            <p>&copy; 2023 by Rhesa Davinanto</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
