import { render, screen } from "../../shared/utils-test";
import FundDeleteConfirmation from "./FundDeleteConfirmation";

test("renders a confirmation message", () => {
  render(<FundDeleteConfirmation onConfirm={() => {}} onCancel={() => {}} />);

  expect(
    screen.getByText(
      "This will permanently remove the fund(s) and re-balance the portfolio. This action cannot be undone.",
    ),
  ).toBeInTheDocument();
});