import React from "react";
import userEvent from "@testing-library/user-event";
import * as useLocalStorage from "react-use/lib/useLocalStorage";
import { render, screen, within } from "./shared/utils-test";
import App from "./App";
import { Portfolio } from "./shared/portfolio";
import { reducer } from "./shared/reducer";

const makeSpiedUseLocalStorage = () => jest.spyOn(useLocalStorage, "default");
beforeEach(() => makeSpiedUseLocalStorage().mockRestore());

const stubUseLocalStorage = (state: ReturnType<typeof reducer>) =>
  makeSpiedUseLocalStorage().mockReturnValue([state, jest.fn(), jest.fn()]);

const makePortfolio = (): Portfolio => ({
  funds: [
    { id: "HSBC World", quantity: 10, price: 10, total: 100, weight: { actual: 0.25, target: 0.5 } },
    { id: "iShares EM", quantity: 15, price: 20, total: 300, weight: { actual: 0.75, target: 0.5 } },
  ],
  total: 400,
});

describe("when rendered without stored state", () => {
  it("doesn't render the total amount", () => {
    render(<App />);

    expect(screen.getByTestId("portfolio-total")).toHaveTextContent("€ 0,00");
  });

  it("doesn't render any funds", () => {
    render(<App />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("the amount input has no value", () => {
    render(<App />);

    expect(screen.getNumberInputByName(/amount/i)).toHaveValue(null);
  });
});

describe("when rendered with stored state", () => {
  it("renders the total amount", async () => {
    stubUseLocalStorage({ amount: 100, portfolio: makePortfolio() });

    render(<App />);

    expect(screen.getByTestId("portfolio-total")).toHaveTextContent("€ 400,00");
  });

  it("renders the stored funds", () => {
    stubUseLocalStorage({ amount: 100, portfolio: makePortfolio() });

    render(<App />);

    const funds = screen.getAllByRole("listitem");
    expect(funds).toHaveLength(2);
    const [fundOne, fundTwo] = funds.map(within);

    expect(fundOne.getByText("HSBC World")).toBeInTheDocument();
    expect(fundOne.getByText("10 x € 10,00")).toBeInTheDocument();
    expect(fundOne.getByText("€ 100,00")).toBeInTheDocument();
    expect(fundOne.getByText("25,00% / 50,00%")).toBeInTheDocument();

    expect(fundTwo.getByText("iShares EM")).toBeInTheDocument();
    expect(fundTwo.getByText("15 x € 20,00")).toBeInTheDocument();
    expect(fundTwo.getByText("€ 300,00")).toBeInTheDocument();
    expect(fundTwo.getByText("75,00% / 50,00%")).toBeInTheDocument();
  });

  it("sets the amount input's value", () => {
    stubUseLocalStorage({ amount: 100, portfolio: makePortfolio() });

    render(<App />);

    expect(screen.getNumberInputByName(/amount/i)).toHaveValue(100);
  });
});

describe("adding a new fund to the portfolio", () => {
  it("renders the updated portfolio", async () => {
    render(<App />);

    userEvent.click(screen.getButtonByName(/plus/i));
    userEvent.type(screen.getTextInputByName(/name/i), "HSBC World");
    userEvent.type(screen.getNumberInputByName(/quantity/i), "10");
    userEvent.type(screen.getNumberInputByName(/price/i), "100");
    userEvent.type(screen.getNumberInputByName(/weight/i), "25");
    userEvent.click(screen.getButtonByName(/save/i));

    expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 1.000,00");

    const fund = within(screen.getByRole("listitem"));
    expect(fund.getByText("HSBC World")).toBeInTheDocument();
    expect(fund.getByText("10 x € 100,00")).toBeInTheDocument();
    expect(fund.getByText("€ 1.000,00")).toBeInTheDocument();
    expect(fund.getByText("100,00% / 25,00%")).toBeInTheDocument();
  });
});

describe("balancing the portfolio", () => {
  it("renders the balanced portfolio", async () => {
    stubUseLocalStorage({ amount: 100, portfolio: makePortfolio() });

    render(<App />);

    const amountInput = screen.getNumberInputByName(/amount/i);
    userEvent.clear(amountInput);
    userEvent.type(amountInput, "200");

    userEvent.click(screen.getButtonByName(/balance/i));

    expect(screen.getByTestId("portfolio-total")).toHaveTextContent("€ 600,00");

    const funds = screen.getAllByRole("listitem");
    expect(funds).toHaveLength(2);
    const [fundOne, fundTwo] = funds.map(within);

    expect(fundOne.getByText("HSBC World")).toBeInTheDocument();
    expect(fundOne.getByText("30 x € 10,00")).toBeInTheDocument();
    expect(fundOne.getByText("€ 300,00")).toBeInTheDocument();
    expect(fundOne.getByText("50,00% / 50,00%")).toBeInTheDocument();

    expect(fundTwo.getByText("iShares EM")).toBeInTheDocument();
    expect(fundTwo.getByText("15 x € 20,00")).toBeInTheDocument();
    expect(fundTwo.getByText("€ 300,00")).toBeInTheDocument();
    expect(fundTwo.getByText("50,00% / 50,00%")).toBeInTheDocument();
  });
});