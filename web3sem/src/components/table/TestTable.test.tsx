import React from "react"; // Ensure React is imported
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieTable from "./TestTable";
import { MovieService } from "../../services/movies.service";

// Correctly mock modules
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

vi.mock("react-intersection-observer", () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true,
  }),
}));

// Ensure React and its hooks are correctly handled
vi.mock("react", async () => {
  const originalReact = await vi.importActual("react");
  return {
    ...originalReact,
    useState: vi.fn().mockImplementation((init) => {
      let value = init;
      const setState = (newValue) => {
        value = typeof newValue === "function" ? newValue(value) : newValue;
        return value;
      };
      return [value, setState];
    }),
  };
});

vi.mock("../../services/movies.service");

describe("MovieTable Component", () => {
  const setMovies = vi.fn();
  const setLoading = vi.fn();
  const setCurrentPage = vi.fn();
  const setTotalPages = vi.fn();
  const setShowMoreButton = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(MovieService.getAll).mockResolvedValue({
      data: { movies: [{ _id: "1", title: "Movie 1", year: 2021, genres: [{ name: "Action" }] }], totalPages: 3 },
    });

    vi.mocked(setMovies).mockImplementation((callback) => callback);
    vi.mocked(setLoading).mockImplementation((callback) => callback);
    vi.mocked(setCurrentPage).mockImplementation((callback) => callback);
    vi.mocked(setTotalPages).mockImplementation((callback) => callback);
    vi.mocked(setShowMoreButton).mockImplementation((callback) => callback);

    vi.mocked(MovieService.deleteMovie).mockResolvedValue({});
  });

  it("should render movies correctly", async () => {
    render(
      <BrowserRouter>
        <MovieTable />
      </BrowserRouter>,
    );

    const movieTitles = await screen.findAllByText(/Movie 1/i);
    expect(movieTitles).toHaveLength(1);
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });

  it("handles pagination correctly", async () => {
    render(
      <BrowserRouter>
        <MovieTable />
      </BrowserRouter>,
    );

    const nextPageButton = screen.getByText("Следующая страница");
    fireEvent.click(nextPageButton);

    expect(MovieService.getAll).toHaveBeenCalledWith("", 2);
  });

  it("deletes a movie correctly", async () => {
    render(
      <BrowserRouter>
        <MovieTable />
      </BrowserRouter>,
    );

    const deleteButtons = await screen.findAllByText("Удалить");
    fireEvent.click(deleteButtons[0]);
    fireEvent.click(await screen.findByText("Да"));

    expect(MovieService.deleteMovie).toHaveBeenCalledWith("1");
  });
});
