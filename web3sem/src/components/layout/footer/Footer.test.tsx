import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import "@testing-library/jest-dom";

describe("Footer", () => {
  test("отображает Footer", () => {
    render(<Footer />);
    const countElement = screen.getByText("221-322 Буторин Илья");
    expect(countElement).toBeInTheDocument();
  });
});
