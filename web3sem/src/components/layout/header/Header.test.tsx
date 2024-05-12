import { describe, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "../../../../tests/setup.tsx";
import Header from "./Header";
import { BrowserRouter } from "react-router-dom";
window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});
describe("Header", () => {
  test("Отображает ссылки навигации", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const mainLink = screen.getByText("Home");
    const tableLink = screen.getByText("Table");
    const aboutUsLink = screen.getByText("About Us");
    const registerLink = screen.getByText("Register");
    const pdfLink = screen.getByText("Generate PDF");
    expect(mainLink).toBeInTheDocument();
    expect(tableLink).toBeInTheDocument();
    expect(aboutUsLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
    expect(pdfLink).toBeInTheDocument();
  });

  test("Кнопка авторизации", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const authButton = screen.getByTestId("auth");
    fireEvent.click(authButton);
    await waitFor(
      () => {
        expect(authButton.textContent).toBe("Выйти");
      },
      { timeout: 5000 },
    );
  });

  test("Кнопка выхода", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const authButton = screen.getByTestId("auth");
    fireEvent.click(authButton);
    fireEvent.click(authButton);
    expect(authButton.textContent).toBe("Войти");
  });
});
