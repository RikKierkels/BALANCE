import { render, screen } from "../../shared/utils-test";
import userEvent from "@testing-library/user-event";
import BalanceInput from "./BalanceInput";

test("renders the currency symbol", () => {
  render(<BalanceInput amount={100} onChange={() => {}} />);

  expect(screen.getByText("€")).toBeInTheDocument();
});

test("renders an initial amount", () => {
  render(<BalanceInput amount={100} onChange={() => {}} />);

  expect(screen.getNumberInputByName(/amount/i)).toHaveValue(100);
});

test("calls change handler when amount is set to a number", () => {
  const mockedHandleChange = jest.fn();
  render(<BalanceInput amount={null} onChange={mockedHandleChange} />);

  userEvent.type(screen.getNumberInputByName(/amount/i), "200");

  expect(mockedHandleChange).toHaveBeenCalledTimes(3);
  expect(mockedHandleChange).toHaveBeenCalledWith(200);
});

test("calls change handler when the amount is cleared", () => {
  const mockedHandleChange = jest.fn();
  render(<BalanceInput amount={200} onChange={mockedHandleChange} />);

  userEvent.clear(screen.getNumberInputByName(/amount/i));

  expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  expect(mockedHandleChange).toHaveBeenCalledWith(null);
});