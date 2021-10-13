import { render, screen } from "../../shared/utils-test";
import BalanceInput from "./BalanceInput";
import { fireEvent } from "@testing-library/react";

const getNumberInput = () => screen.getByRole("spinbutton");

test("renders the currency symbol", () => {
  render(<BalanceInput amount={100} onChange={() => {}} />);

  const symbol = screen.getByText("€");
  expect(symbol).toBeInTheDocument();
});

test("renders an initial amount", () => {
  render(<BalanceInput amount={100} onChange={() => {}} />);

  const input = getNumberInput();
  expect(input).toHaveValue(100);
});

test("calls change handler when amount is set to a number", () => {
  const mockedHandleChange = jest.fn();
  render(<BalanceInput amount={null} onChange={mockedHandleChange} />);

  const input = getNumberInput();
  fireEvent.change(input, { target: { value: "200" } });

  expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  expect(mockedHandleChange).toHaveBeenCalledWith(200);
});

test("calls change handler when amount is set to an empty value", () => {
  const mockedHandleChange = jest.fn();
  render(<BalanceInput amount={100} onChange={mockedHandleChange} />);

  const input = getNumberInput();
  fireEvent.change(input, { target: { value: "" } });

  expect(mockedHandleChange).toHaveBeenCalledTimes(1);
  expect(mockedHandleChange).toHaveBeenCalledWith(null);
});