import React from "react";
import { render, screen } from "./shared/utils-test";
import App from "./App";

test("renders the total worth of the portfolio", () => {
  render(<App />);

  const total = screen.getByText("€ 400,00");
  expect(total).toBeInTheDocument();
});