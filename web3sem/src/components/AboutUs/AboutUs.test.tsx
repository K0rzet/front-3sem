import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutUs from "./AboutUs";
import "@testing-library/jest-dom";

describe("AboutUs", () => {
  test("отображает AboutUs", () => {
    render(<AboutUs />);
    const countElement = screen.getByText("AboutUs");
    expect(countElement).toBeInTheDocument();
  });
});
