import React from "react";
import { fireEvent, within } from "@testing-library/react";
import { render, screen } from "./shared/utils-test";
import App from "./App";

test("can add a fund", async () => {
  render(<App />);

  const addButton = screen.getByRole("button", { name: /plus/i });
  fireEvent.click(addButton);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  fireEvent.input(nameInput, { target: { value: "HSBC" } });

  const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i });
  fireEvent.input(quantityInput, { target: { value: 10 } });

  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  fireEvent.input(priceInput, { target: { value: 100 } });

  const weightInput = screen.getByRole("spinbutton", { name: /weight/i });
  fireEvent.input(weightInput, { target: { value: 25 } });

  const saveButton = screen.getByRole("button", { name: /save/i });
  fireEvent.submit(saveButton);

  const fundListItem = await screen.findByRole("listitem");
  expect(fundListItem).toBeInTheDocument();

  const fund = within(fundListItem);

  const name = fund.getByText("HSBC");
  expect(name).toBeInTheDocument();

  const quantityPrice = fund.getByText("10 x € 100,00");
  expect(quantityPrice).toBeInTheDocument();

  const total = fund.getByText("€ 1.000,00");
  expect(total).toBeInTheDocument();

  const weights = fund.getByText("100,00% / 25,00%");
  expect(weights).toBeInTheDocument();
});