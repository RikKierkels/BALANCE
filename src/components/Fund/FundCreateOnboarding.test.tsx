import { render, screen } from "../../shared/utils-test";
import FundCreateOnboarding from "./FundCreateOnboarding";

test("renders a title", () => {
  render(<FundCreateOnboarding onCreateFundClick={() => {}} />);

  expect(screen.getByText("Add your first fund")).toBeInTheDocument();
});

test("renders information about adding a fund", () => {
  render(<FundCreateOnboarding onCreateFundClick={() => {}} />);

  expect(
    screen.getByText(
      "Funds are your investments. They can be anything from stocks to ETF's or bonds. After you add your first fund you can start balancing your portfolio.",
    ),
  ).toBeInTheDocument();
});