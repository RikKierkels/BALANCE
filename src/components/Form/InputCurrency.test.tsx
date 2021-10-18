import { render, screen } from "../../shared/utils-test";
import InputCurrency from "./InputCurrency";

test("renders the currency symbol", () => {
  render(<InputCurrency value={100} onChange={() => {}} />);

  expect(screen.getByText("€")).toBeInTheDocument();
});