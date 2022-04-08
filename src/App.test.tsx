import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "./shared/utils-test";
import App from "./App";

test("when a new fund is added through the onboarding, shows the portfolio", async () => {
  render(<App />);

  userEvent.click(screen.getButtonByName(/add a fund/i));

  const modal = within(screen.getByRole("dialog"));
  userEvent.type(modal.getByLabelText(/name/i), "S&P 500");
  userEvent.type(modal.getByLabelText(/quantity/i), "10");
  userEvent.type(modal.getByLabelText(/price/i), "100");
  userEvent.type(modal.getByLabelText(/weight/i), "25");
  userEvent.click(modal.getButtonByName(/add fund/i));

  expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 1.000,00");

  const fund = within(screen.getByRole("listitem"));
  expect(fund.getByText("S&P 500")).toBeInTheDocument();
  expect(fund.getByText("100,00% / 25,00%")).toBeInTheDocument();
  expect(fund.getByText("10")).toBeInTheDocument();
  expect(fund.getByText("€ 100,00")).toBeInTheDocument();
  expect(fund.getByText("€ 1.000,00")).toBeInTheDocument();
});