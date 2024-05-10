import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";

describe("Home", () => {
  test("отображает Home", () => {
    render(<Home />);
    const countElement = screen.getByText("Home");
    expect(countElement).toBeInTheDocument();
  });
});
