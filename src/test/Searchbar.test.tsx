/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/common/Searchbar";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without error", () => {
    render(<SearchBar />);
  });

  test("navigates to search page with correct query parameters", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <SearchBar />
    );

    const searchInput = getByPlaceholderText("Enter a movie title");
    const includeAdultSelect = getByLabelText("Include Adult:");
    const yearSelect = getByLabelText("Year:");
    const searchButton = getByText("Search");

    fireEvent.change(searchInput, { target: { value: "John Wick" } });
    fireEvent.change(includeAdultSelect, { target: { value: "yes" } });
    fireEvent.change(yearSelect, { target: { value: "2022" } });
    fireEvent.click(searchButton);

    expect(navigate).toHaveBeenCalledWith(
      "/movies/search?title=John%20Wick&year=2022&includeAdult=yes"
    );
  });

  test("displays error message if query is empty", () => {
    const { getByText, getByPlaceholderText, getByLabelText } = render(
      <SearchBar />
    );

    const searchInput = getByPlaceholderText("Enter a movie title");
    const includeAdultSelect = getByLabelText("Include Adult:");
    const yearSelect = getByLabelText("Year:");
    const searchButton = getByText("Search");

    fireEvent.change(searchInput, { target: { value: "" } });
    fireEvent.change(includeAdultSelect, { target: { value: "no" } });
    fireEvent.change(yearSelect, { target: { value: "2023" } });
    fireEvent.click(searchButton);

    const errorMessage = getByText("Title is required");
    expect(errorMessage).toBeInTheDocument();
  });

  test("navigates to search page without year and includeAdult parameters if not selected", () => {
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);

  const { getByText, getByPlaceholderText } = render(<SearchBar />);

  const searchInput = getByPlaceholderText("Enter a movie title");
  const searchButton = getByText("Search");

  fireEvent.change(searchInput, { target: { value: "John Wick" } });
  fireEvent.click(searchButton);

  expect(navigate).toHaveBeenCalledWith(
    "/movies/search?title=John%20Wick&year=2023&includeAdult=no"
  );
});
});
