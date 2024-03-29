import { UseFormRegister, UseFormRegisterReturn, ValidationRule } from "react-hook-form";
import { FundCreateOrUpdate, FundPrices } from "../../shared/portfolio";
import { BalanceAmount } from "../Portfolio/PortfolioBalanceForm";
import React from "react";

const required = (name: string = "value"): ValidationRule<boolean> => ({
  value: true,
  message: `Please enter a ${name}.`,
});
const min = (value: number, message: string = `Must be ${value} or higher`): ValidationRule<string | number> => ({
  value,
  message,
});
const max = (value: number, message: string = `Must be ${value} or lower`): ValidationRule<string | number> => ({
  value,
  message,
});

export const inputs: Record<
  string,
  (
    register: UseFormRegister<BalanceAmount | FundCreateOrUpdate | FundPrices>,
    name?: string,
  ) => UseFormRegisterReturn & React.ComponentPropsWithoutRef<"input">
> = {
  amount: (register, name = "amount") => ({
    type: "number",
    ...register(name, { required: required("amount"), min: min(0, "Please enter a positive amount.") }),
  }),
  name: (register, name = "name") => register(name, { required: required("name") }),
  quantity: (register, name = "quantity") => ({
    type: "number",
    ...register(name, {
      required: required("quantity"),
      min: min(0, "Please enter a positive quantity."),
      valueAsNumber: true,
    }),
  }),
  price: (register, name = "price") => ({
    type: "number",
    step: "0.001",
    ...register(name, {
      required: required("price"),
      min: min(0, "Please enter a positive price."),
      valueAsNumber: true,
    }),
  }),
  weight: (register, name = "weight") => ({
    type: "number",
    ...register(name, {
      required: required("weight"),
      min: min(0, "Please enter a weight between 0 and 100."),
      max: max(100, "Please enter a weight between 0 and 100."),
      valueAsNumber: true,
    }),
  }),
};