import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Auth from "./Auth";
import "@testing-library/jest-dom";

describe("Auth", () => {
  test("отображает Auth", () => {
    render(<Auth />);
    const countElement = screen.getByText("Register");
    expect(countElement).toBeInTheDocument();
  });
});
