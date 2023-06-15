/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "../layout/Layout";

describe("Layout", () => {
  test("renders header with correct title", () => {
    const { getByText } = render(<Layout />, { wrapper: MemoryRouter });
    const titleElement = getByText("Rhesa's Movie App");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders navigation links correctly", () => {
    const { getByText } = render(<Layout />, { wrapper: MemoryRouter });
    const nowPlayingLink = getByText("Now Playing");
    const popularLink = getByText("Popular");
    const topRatedLink = getByText("Top Rated");
    const upcomingLink = getByText("Upcoming");

    expect(nowPlayingLink).toBeInTheDocument();
    expect(popularLink).toBeInTheDocument();
    expect(topRatedLink).toBeInTheDocument();
    expect(upcomingLink).toBeInTheDocument();
  });

  test("renders footer with correct text", () => {
    const { getByText } = render(<Layout />, { wrapper: MemoryRouter });
    const footerElement = getByText("© 2023 by Rhesa Davinanto");
    expect(footerElement).toBeInTheDocument();
  });
});
