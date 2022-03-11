import React from "react";
import userEvent from "@testing-library/user-event";
import * as useLocalStorage from "react-use/lib/useLocalStorage";
import { render, screen, within } from "./shared/utils-test";
import App from "./App";
import { Portfolio } from "./shared/portfolio";
import { reducer } from "./reducer";

const createSpiedUseLocalStorage = () => jest.spyOn(useLocalStorage, "default");
beforeEach(() => createSpiedUseLocalStorage().mockRestore());

const stubUseLocalStorage = (state: ReturnType<typeof reducer>) =>
  createSpiedUseLocalStorage().mockReturnValue([state, jest.fn(), jest.fn()]);

const createPortfolio = (): Portfolio => ({
  funds: [
    {
      id: "bd34eb98-fc84-4487-b847-50012ac50e02",
      name: "HSBC World",
      quantity: 10,
      price: 10,
      total: 100,
      weight: { actual: 0.25, target: 0.5 },
    },
    {
      id: "902c0974-7a6c-4f5e-8124-afcce9300fcf",
      name: "iShares EM",
      quantity: 15,
      price: 20,
      total: 300,
      weight: { actual: 0.75, target: 0.5 },
    },
  ],
  total: 400,
});

describe("when rendered without stored state", () => {
  it("renders the total amount", () => {
    render(<App />);

    expect(screen.getByTestId("portfolio-total")).toHaveTextContent("€ 0,00");
  });

  it("doesn't render any funds", () => {
    render(<App />);

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("the amount input has no value", () => {
    render(<App />);

    expect(screen.getByLabelText(/amount/i)).toHaveValue(null);
  });
});

describe("when rendered with stored state", () => {
  it("renders the total amount", async () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });

    render(<App />);

    expect(screen.getByTestId("portfolio-total")).toHaveTextContent("€ 400,00");
  });

  it("renders the stored funds", () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });

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
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });

    render(<App />);

    expect(screen.getByLabelText(/amount/i)).toHaveValue(100);
  });
});

describe("balancing the portfolio", () => {
  it("renders the balanced portfolio", async () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });

    render(<App />);

    const amountInput = screen.getByLabelText(/amount/i);
    userEvent.clear(amountInput);
    userEvent.type(amountInput, "200");
    userEvent.click(screen.getButtonByName(/balance/i));

    expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 600,00");
    const [fundOne, fundTwo] = screen.getAllByRole("listitem").map(within);

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

describe("adding a new fund to the portfolio", () => {
  it("renders the updated portfolio", async () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });

    render(<App />);

    userEvent.click(screen.getButtonByName(/add fund/i));
    const modal = within(screen.getByRole("dialog"));
    userEvent.type(modal.getByLabelText(/name/i), "S&P 500");
    userEvent.type(modal.getByLabelText(/quantity/i), "10");
    userEvent.type(modal.getByLabelText(/price/i), "100");
    userEvent.type(modal.getByLabelText(/weight/i), "25");
    userEvent.click(modal.getButtonByName(/add fund/i));

    expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 1.400,00");
    const [fundOne, fundTwo, fundThree] = screen.getAllByRole("listitem").map(within);

    expect(fundOne.getByText("HSBC World")).toBeInTheDocument();
    expect(fundOne.getByText("10 x € 10,00")).toBeInTheDocument();
    expect(fundOne.getByText("€ 100,00")).toBeInTheDocument();
    expect(fundOne.getByText("7,14% / 50,00%")).toBeInTheDocument();

    expect(fundTwo.getByText("iShares EM")).toBeInTheDocument();
    expect(fundTwo.getByText("15 x € 20,00")).toBeInTheDocument();
    expect(fundTwo.getByText("€ 300,00")).toBeInTheDocument();
    expect(fundTwo.getByText("21,43% / 50,00%")).toBeInTheDocument();

    expect(fundThree.getByText("S&P 500")).toBeInTheDocument();
    expect(fundThree.getByText("10 x € 100,00")).toBeInTheDocument();
    expect(fundThree.getByText("€ 1.000,00")).toBeInTheDocument();
    expect(fundThree.getByText("71,43% / 25,00%")).toBeInTheDocument();
  });
});

describe("updating an existing fund in the portfolio", () => {
  it("renders the updated portfolio", async () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });

    render(<App />);

    const [_, fund] = screen.getAllByRole("listitem");
    userEvent.click(within(fund).getButtonByName(/pencil/i));
    const modal = within(screen.getByRole("dialog"));

    const nameInput = modal.getByLabelText(/name/i);
    userEvent.type(nameInput, " UPDATED");

    const quantityInput = modal.getByLabelText(/quantity/i);
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, "20");

    const priceInput = modal.getByLabelText(/price/i);
    userEvent.clear(priceInput);
    userEvent.type(priceInput, "30.50");

    const weightInput = modal.getByLabelText(/weight/i);
    userEvent.clear(weightInput);
    userEvent.type(weightInput, "75");

    userEvent.click(modal.getButtonByName(/update fund/i));

    expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 710,00");
    const [fundOne, fundTwo] = screen.getAllByRole("listitem").map(within);

    expect(fundOne.getByText("HSBC World")).toBeInTheDocument();
    expect(fundOne.getByText("10 x € 10,00")).toBeInTheDocument();
    expect(fundOne.getByText("€ 100,00")).toBeInTheDocument();
    expect(fundOne.getByText("14,08% / 50,00%")).toBeInTheDocument();

    expect(fundTwo.getByText("iShares EM UPDATED")).toBeInTheDocument();
    expect(fundTwo.getByText("20 x € 30,50")).toBeInTheDocument();
    expect(fundTwo.getByText("€ 610,00")).toBeInTheDocument();
    expect(fundTwo.getByText("85,92% / 75,00%")).toBeInTheDocument();
  });
});

describe("selecting funds in the portfolio", () => {
  it("can select and deselect a fund", () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    const checkbox = screen.getByLabelText(/select hsbc/i) as HTMLInputElement;

    expect(checkbox.checked).toBeFalsy();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
  });

  it("can select and deselect all funds", () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    const checkboxSelectAll = screen.getByLabelText(/select all funds/i) as HTMLInputElement;
    const checkboxFundOne = screen.getByLabelText(/select hsbc/i) as HTMLInputElement;
    const checkboxFundTwo = screen.getByLabelText(/select ishares/i) as HTMLInputElement;

    expect(checkboxFundOne.checked).toBeFalsy();
    expect(checkboxFundTwo.checked).toBeFalsy();

    userEvent.click(checkboxSelectAll);
    expect(checkboxFundOne.checked).toBeTruthy();
    expect(checkboxFundTwo.checked).toBeTruthy();

    userEvent.click(checkboxSelectAll);
    expect(checkboxFundOne.checked).toBeFalsy();
    expect(checkboxFundTwo.checked).toBeFalsy();
  });

  it("when a fund is selected, hides the add fund action", () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    const checkbox = screen.getByLabelText(/select hsbc/i) as HTMLInputElement;

    expect(screen.getButtonByName(/add fund/i)).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(screen.queryButtonByName(/add fund/i)).not.toBeInTheDocument();

    userEvent.click(checkbox);
    expect(screen.getButtonByName(/add fund/i)).toBeInTheDocument();
  });

  it("when a fund is selected, shows the select actions", () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    const checkbox = screen.getByLabelText(/select hsbc/i) as HTMLInputElement;

    expect(screen.queryButtonByName(/delete/i)).not.toBeInTheDocument();
    expect(screen.queryButtonByName(/deselect/i)).not.toBeInTheDocument();

    userEvent.click(checkbox);
    expect(screen.getButtonByName(/delete/i)).toBeInTheDocument();
    expect(screen.getButtonByName(/deselect/i)).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(screen.queryButtonByName(/delete/i)).not.toBeInTheDocument();
    expect(screen.queryButtonByName(/deselect/i)).not.toBeInTheDocument();
  });

  it("when funds are selected, clicking the deselect action, deselects all funds", () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    const checkboxFundOne = screen.getByLabelText(/select hsbc/i) as HTMLInputElement;
    const checkboxFundTwo = screen.getByLabelText(/select ishares/i) as HTMLInputElement;

    userEvent.click(checkboxFundOne);
    userEvent.click(checkboxFundTwo);
    expect(checkboxFundOne.checked).toBeTruthy();
    expect(checkboxFundTwo.checked).toBeTruthy();

    userEvent.click(screen.getByText(/deselect/i));
    expect(checkboxFundOne.checked).toBeFalsy();
    expect(checkboxFundTwo.checked).toBeFalsy();
  });
});

describe("deleting a fund in the portfolio", () => {
  it("when confirmed, deletes the fund and renders the updated portfolio", async () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    const checkboxFundTwo = screen.getByLabelText(/select ishares/i) as HTMLInputElement;
    userEvent.click(checkboxFundTwo);
    userEvent.click(screen.getButtonByName(/delete/i));

    const modal = screen.getByRole("dialog");
    userEvent.click(within(modal).getButtonByName(/delete/i));

    expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 100,00");
    const funds = screen.getAllByRole("listitem").map(within);
    expect(funds).toHaveLength(1);

    const [fundOne] = funds;
    expect(fundOne.getByText("HSBC World")).toBeInTheDocument();
    expect(fundOne.getByText("10 x € 10,00")).toBeInTheDocument();
    expect(fundOne.getByText("€ 100,00")).toBeInTheDocument();
    expect(fundOne.getByText("100,00% / 50,00%")).toBeInTheDocument();
  });

  it("when cancelled, keeps the fund and doesn't update the portfolio", async () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    const checkboxFundTwo = screen.getByLabelText(/select ishares/i) as HTMLInputElement;
    userEvent.click(checkboxFundTwo);
    userEvent.click(screen.getButtonByName(/delete/i));

    const modal = screen.getByRole("dialog");
    userEvent.click(within(modal).getButtonByName(/cancel/i));

    expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 400,00");
    const funds = screen.getAllByRole("listitem").map(within);
    expect(funds).toHaveLength(2);
  });
});

describe.skip("updating the prices of funds in the portfolio", () => {
  it("renders the updated portfolio", async () => {
    stubUseLocalStorage({ selectedFundIds: [], amount: 100, portfolio: createPortfolio(), increment: null });
    render(<App />);

    userEvent.click(screen.getButtonByName(/money/i));
    const modal = within(screen.getByRole("dialog"));

    const priceInput = modal.getByLabelText(/hsbc/i);
    userEvent.clear(priceInput);
    userEvent.type(priceInput, "300");
    expect(modal.getByLabelText(/ishares/i)).toBeInTheDocument();
    userEvent.click(screen.getButtonByName(/save/i));

    expect(await screen.findByTestId("portfolio-total")).toHaveTextContent("€ 3.300,00");

    const [fundOne, fundTwo] = screen.getAllByRole("listitem").map(within);
    expect(fundOne.getByText("HSBC World")).toBeInTheDocument();
    expect(fundOne.getByText("10 x € 300,00")).toBeInTheDocument();
    expect(fundOne.getByText("€ 3.000,00")).toBeInTheDocument();
    expect(fundOne.getByText("90,91% / 50,00%")).toBeInTheDocument();

    expect(fundTwo.getByText("iShares EM")).toBeInTheDocument();
    expect(fundTwo.getByText("15 x € 20,00")).toBeInTheDocument();
    expect(fundTwo.getByText("€ 300,00")).toBeInTheDocument();
    expect(fundTwo.getByText("9,09% / 50,00%")).toBeInTheDocument();
  });
});