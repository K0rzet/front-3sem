import { describe } from "vitest";
import { render, screen, waitFor, fireEvent } from "../../../tests/setup.tsx";
import GeneratePdf from "./GeneratePdf.tsx";

describe("CVForm", () => {
  test("renders form fields correctly", () => {
    const { getByLabelText } = render(<GeneratePdf />);
    expect(getByLabelText("Название фильма:")).toBeInTheDocument();
    expect(getByLabelText("Постер:")).toBeInTheDocument();
  });

  test("displays error messages for invalid form input", async () => {
    const { findByText, getByLabelText, getByTestId } = render(<GeneratePdf />);

    const titleInput = getByLabelText("Название фильма:");
    const posterInput = getByLabelText("Постер:");

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    fireEvent.change(titleInput, { target: { value: "ab" } });
    fireEvent.change(posterInput, { target: { files: [file] } });

    fireEvent.click(getByTestId("save-changes"));

    expect(await findByText("Минимальная длина 3 символа", {}, { timeout: 5000 })).toBeInTheDocument();
  });
  test("allows submitting valid form data", async () => {
    render(<GeneratePdf />);

    const titleInput = screen.getByLabelText("Название фильма:");
    const posterInput = screen.getByLabelText("Постер:");
    const file = new File(["some image"], "image.png", { type: "image/png" });

    fireEvent.change(titleInput, { target: { value: "Inception" } });

    await waitFor(() =>
      fireEvent.change(posterInput, {
        target: { files: [file] },
      }),
    );

    fireEvent.click(screen.getByText("Сохранить изменения"));

    await waitFor(() => {
      const pdfLink = screen.findByTestId("download-pdf");
      expect(pdfLink).toBeTruthy();
    });
  });
});
// import React from "react";
// import { render, fireEvent, waitFor, getByTestId } from "../../../tests/setup.tsx";
// import GeneratePdf from "./GeneratePdf";
// import { vi, describe } from "vitest";
// URL.createObjectURL = vi.fn();
// describe("GeneratePdf component", () => {


//   test("allows submitting valid form data", async () => {
//     const { getByText, getByLabelText, findByTestId, getByTestId } = render(<GeneratePdf />);

//     const titleInput = getByLabelText("Название фильма:");
//     const posterInput = getByTestId("poster");
//     const file = new File(["Some image"], "chucknorris.png", { type: "image/png" });

//     fireEvent.change(titleInput, { target: { value: "Some text" } });
//     await waitFor(() =>
//       fireEvent.change(posterInput, {
//         target: { files: [file] },
//       }),
//     );
//     fireEvent.click(getByText("Сохранить изменения"));

//     await waitFor(() => {
//       const pdfLink: Promise<HTMLElement> = findByTestId("download-pdf");
//       expect(pdfLink.toBeTruthy());
//     });
//   });
// });
