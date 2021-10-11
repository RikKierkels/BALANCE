import { render, screen } from "../../shared/utils-test";
import BalanceInput from "./BalanceInput";
import { fireEvent } from "@testing-library/react";

test("renders the currency symbol", () => {
  render(<BalanceInput amount={100} onChange={() => {}} />);

  const symbol = screen.getByText("€");
  expect(symbol).toBeInTheDocument();
});

test("renders an initial amount", () => {
  render(<BalanceInput amount={100} onChange={() => {}} />);

  const input = screen.getByRole("spinbutton");
  expect(input).toHaveValue(100);
});

test("calls onChange when amount is changed to a number", () => {
  const mockedHandleChange = jest.fn();
  render(<BalanceInput amount={undefined} onChange={mockedHandleChange} />);

  const input = screen.getByRole("spinbutton");
  fireEvent.change(input, { target: { value: "200" } });

  expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  expect(mockedHandleChange).toHaveBeenCalledWith(200);
});

test("calls onChange when amount is emptied", () => {
  const mockedHandleChange = jest.fn();
  render(<BalanceInput amount={100} onChange={mockedHandleChange} />);

  const input = screen.getByRole("spinbutton");
  fireEvent.change(input, { target: { value: "" } });

  expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  expect(mockedHandleChange).toHaveBeenCalledWith(null);
});