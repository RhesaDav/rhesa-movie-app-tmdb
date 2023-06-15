/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "../components/common/Pagination";

describe("Pagination", () => {
  test("renders without error", () => {
    const props = {
      currentPage: 1,
      loadPrevPage: jest.fn(),
      loadNextPage: jest.fn(),
      totalPages: 10,
    };

    render(<Pagination {...props} />);
  });

  test("disables Prev Page button when on the first page", () => {
    const props = {
      currentPage: 1,
      loadPrevPage: jest.fn(),
      loadNextPage: jest.fn(),
      totalPages: 10,
    };

    const { getByText } = render(<Pagination {...props} />);
    const prevPageButton = getByText("Prev Page");

    expect(prevPageButton).toBeDisabled();
    fireEvent.click(prevPageButton);
    expect(props.loadPrevPage).not.toHaveBeenCalled();
  });

  test("disables Next Page button when on the last page", () => {
    const props = {
      currentPage: 10,
      loadPrevPage: jest.fn(),
      loadNextPage: jest.fn(),
      totalPages: 10,
    };

    const { getByText } = render(<Pagination {...props} />);
    const nextPageButton = getByText("Next Page");

    expect(nextPageButton).toBeDisabled();
    fireEvent.click(nextPageButton);
    expect(props.loadNextPage).not.toHaveBeenCalled();
  });

  test("calls loadPrevPage when Prev Page button is clicked", () => {
    const props = {
      currentPage: 5,
      loadPrevPage: jest.fn(),
      loadNextPage: jest.fn(),
      totalPages: 10,
    };

    const { getByText } = render(<Pagination {...props} />);
    const prevPageButton = getByText("Prev Page");

    fireEvent.click(prevPageButton);
    expect(props.loadPrevPage).toHaveBeenCalled();
  });

  test("calls loadNextPage when Next Page button is clicked", () => {
    const props = {
      currentPage: 5,
      loadPrevPage: jest.fn(),
      loadNextPage: jest.fn(),
      totalPages: 10,
    };

    const { getByText } = render(<Pagination {...props} />);
    const nextPageButton = getByText("Next Page");

    fireEvent.click(nextPageButton);
    expect(props.loadNextPage).toHaveBeenCalled();
  });
});
