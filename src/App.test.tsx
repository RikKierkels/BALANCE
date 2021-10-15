import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "./shared/utils-test";
import App from "./App";

test("can add a fund", async () => {
  render(<App />);

  userEvent.click(screen.getButtonByName(/plus/i));

  userEvent.type(screen.getTextInputByName(/name/i), "HSBC");
  userEvent.type(screen.getNumberInputByName(/quantity/i), "10");
  userEvent.type(screen.getNumberInputByName(/price/i), "100");
  userEvent.type(screen.getNumberInputByName(/weight/i), "25");

  userEvent.click(screen.getButtonByName(/save/i));

  const fundListItem = within(await screen.findByRole("listitem"));
  expect(fundListItem.getByText("HSBC")).toBeInTheDocument();
  expect(fundListItem.getByText("10 x € 100,00")).toBeInTheDocument();
  expect(fundListItem.getByText("€ 1.000,00")).toBeInTheDocument();
  expect(fundListItem.getByText("100,00% / 25,00%")).toBeInTheDocument();
});