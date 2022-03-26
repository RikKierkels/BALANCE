import { render, screen } from "./shared/utils-test";
import AppOnboarding from "./AppOnboarding";

test("renders a title", () => {
  render(<AppOnboarding onCreateFundClick={() => {}} />);

  expect(screen.getByText("Add your first fund")).toBeInTheDocument();
});

test("renders information about adding a fund", () => {
  render(<AppOnboarding onCreateFundClick={() => {}} />);

  expect(
    screen.getByText(
      "Funds are your investments. They can be anything from stocks to ETF's or bonds. After you add your first fund you can start balancing your portfolio.",
    ),
  ).toBeInTheDocument();
});