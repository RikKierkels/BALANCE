import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../shared/utils-test";
import Onboarding from "./Onboarding";

test("renders a title", () => {
  render(<Onboarding />);

  expect(screen.getByText("Add your first fund")).toBeInTheDocument();
});

test("renders information about adding a fund", () => {
  render(<Onboarding />);

  expect(
    screen.getByText(
      "Funds are your investments. They can be anything from stocks to ETF's or bonds. After you add your first fund you can start balancing your portfolio.",
    ),
  ).toBeInTheDocument();
});

test("when the shortcut for adding a fund is pressed, opens a modal to add a fund", async () => {
  render(<Onboarding />);

  userEvent.keyboard("n");

  const modal = await screen.findByRole("dialog");
  expect(modal).toHaveTextContent("Add fund");
});