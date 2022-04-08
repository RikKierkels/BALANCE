import { render, screen } from "../../shared/utils-test";
import FundDeleteForm from "./FundDeleteForm";

test("renders a confirmation message", () => {
  render(<FundDeleteForm onConfirm={() => {}} onCancel={() => {}} />);

  expect(
    screen.getByText(
      "This will permanently remove the fund(s) and re-balance the portfolio. This action cannot be undone.",
    ),
  ).toBeInTheDocument();
});