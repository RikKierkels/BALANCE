import { render, screen, within } from "../../shared/utils-test";
import { fireEvent } from "@testing-library/dom";
import { createFund } from "../../shared/factories";
import FundPricesUpdateForm from "./FundPricesUpdateForm";
import { Fund } from "../../shared/portfolio";

const validate = (name: string, message: string, funds: Fund[]) =>
  test(name, async () => {
    render(<FundPricesUpdateForm onSubmit={jest.fn} funds={funds} />);

    fireEvent.click(screen.getButtonByName(/save/i));

    const [labelOne, labelTwo, labelThree] = funds.map(({ name }) => screen.getLabelByLabelText(name)).map(within);
    expect(await labelOne.findByText(message)).toBeInTheDocument();
    expect(labelTwo.queryByText(message)).not.toBeInTheDocument();
    expect(labelThree.getByText(message)).toBeInTheDocument();
  });

validate("when the price is empty, renders an error message", "Please enter a price.", [
  createFund({ id: "bd34eb98-fc84-4487-b847-50012ac50e02", name: "World", price: undefined }),
  createFund({ id: "902c0974-7a6c-4f5e-8124-afcce9300fcf", name: "EM", price: 100 }),
  createFund({ id: "4a526269-ecaa-49d3-9fd0-8025205dc67b", name: "S&P500", price: undefined }),
]);

validate("when the price is below zero, renders an error message", "Please enter a positive price.", [
  createFund({ id: "bd34eb98-fc84-4487-b847-50012ac50e02", name: "World", price: -10 }),
  createFund({ id: "902c0974-7a6c-4f5e-8124-afcce9300fcf", name: "EM", price: 100 }),
  createFund({ id: "4a526269-ecaa-49d3-9fd0-8025205dc67b", name: "S&P500", price: -100 }),
]);