import { fireEvent } from "@testing-library/dom";
import { Fund } from "../../shared/portfolio";
import { createFund } from "../../shared/factories";
import { render, screen, within } from "../../shared/utils-test";
import FundCreateOrUpdateForm from "./FundCreateOrUpdateForm";

const validate = (name: string, cases: [string, Partial<Fund>, string][]) =>
  test.each(cases)(name, async (text, fund, message) => {
    render(<FundCreateOrUpdateForm onSubmit={() => {}} fund={createFund(fund)} />);

    fireEvent.click(screen.getButtonByName(/save/i));

    const label = screen.getLabelByLabelText(text);
    expect(await within(label).findByText(message)).toBeInTheDocument();
  });

validate("when the %s is empty, renders an error message", [
  ["Name", { name: "" }, "Please enter a name."],
  ["Quantity", { quantity: undefined }, "Please enter a quantity."],
  ["Price", { price: undefined }, "Please enter a price."],
  ["Target weight", { weight: undefined }, "Please enter a weight."],
]);

validate("when the %s is below zero, renders an error message", [
  ["Quantity", { quantity: -10 }, "Please enter a positive quantity."],
  ["Price", { price: -100 }, "Please enter a positive price."],
  ["Target weight", { weight: { target: -1.0, actual: 0.0 } }, "Please enter a weight between 0 and 100."],
]);

validate("when the %s is higher than 100, renders an error message", [
  ["Target weight", { weight: { target: 1.1, actual: 0.0 } }, "Please enter a weight between 0 and 100."],
]);