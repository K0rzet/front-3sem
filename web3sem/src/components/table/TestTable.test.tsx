import { describe, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "../../../tests/setup.tsx";
import MovieTable from "./TestTable.tsx";
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
vi.mock("react-intersection-observer", () => ({
  useInView: vi.fn().mockReturnValue({ ref: {}, inView: true }),
}));
describe("TestTable", () => {
  test("Отображает таблицу", () => {
    render(
      <BrowserRouter>
        <MovieTable />
      </BrowserRouter>,
    );
    const title = screen.getByText("Title");
    expect(title).toBeInTheDocument();
    const year = screen.getByText("Year");
    expect(year).toBeInTheDocument();
    const genres = screen.getByText("Genres");
    expect(genres).toBeInTheDocument();
    const actions = screen.getByText("Actions");
    expect(actions).toBeInTheDocument();
    const table = screen.getByTestId("table");
    expect(table).toBeInTheDocument();
  });
  test("Получение данных с сервера", async () => {
    render(
      <BrowserRouter>
        <MovieTable />
      </BrowserRouter>,
    );
    await waitFor(
      () => {
        const firstData = screen.getByText("dfgdfgfd");
        expect(firstData).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
  test("Смена типа пагинации", async () => {
    render(
      <BrowserRouter>
        <MovieTable />
      </BrowserRouter>,
    );
    const dynamicButton = screen.getByText("Динамическая пагинация");
    fireEvent.click(dynamicButton);
    await waitFor(
      () => {
        const moreButton = screen.getByText("Показать еще");
        expect(moreButton).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
  test("Пагинация", async () => {
    render(
      <BrowserRouter>
        <MovieTable />
      </BrowserRouter>,
    );
    const forwardButton = screen.getByTestId("forward-button");
    console.log(forwardButton);
    fireEvent.click(forwardButton);
    await waitFor(
      () => {
        const pageNumber = screen.getByText("Страница 2 из 20");
        expect(pageNumber).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});
