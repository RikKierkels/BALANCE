import React from "react";
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