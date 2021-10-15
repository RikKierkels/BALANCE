import { buildQueries, within, ByRoleOptions } from "@testing-library/react";
import { ByRoleMatcher } from "@testing-library/dom/types/matches";

const elementWithRoleByName =
  (role: ByRoleMatcher) => (container: HTMLElement, name: ByRoleOptions["name"], args: Omit<ByRoleOptions, "name">) =>
    within(container).getAllByRole(role, { name, ...args });
const textInputByName = elementWithRoleByName("textbox");
const numberInputByName = elementWithRoleByName("spinbutton");
const buttonByName = elementWithRoleByName("button");

const [queryTextInputByName, getAllTextInputsByName, getTextInputByName, findAllTextInputsByName, findTextInputByName] =
  buildQueries(
    textInputByName,
    (_, value) => `Found multiple text inputs with a name of: ${value}`,
    (_, value) => `Unable to find a text input with a name of: ${value}`,
  );

const [
  queryNumberInputByName,
  getAllNumberInputsByName,
  getNumberInputByName,
  findAllNumberInputsByName,
  findNumberInputByName,
] = buildQueries(
  numberInputByName,
  (_, value) => `Found multiple number inputs with a name of: ${value}`,
  (_, value) => `Unable to find a number input with a name of: ${value}`,
);

const [queryButtonByName, getAllButtonsByName, getButtonByName, findAllButtonsByName, findButtonByName] = buildQueries(
  buttonByName,
  (_, value) => `Found multiple buttons with a name of: ${value}`,
  (_, value) => `Unable to find a button with a name of: ${value}`,
);

export {
  queryTextInputByName,
  getAllTextInputsByName,
  getTextInputByName,
  findAllTextInputsByName,
  findTextInputByName,
  queryNumberInputByName,
  getAllNumberInputsByName,
  getNumberInputByName,
  findAllNumberInputsByName,
  findNumberInputByName,
  queryButtonByName,
  getAllButtonsByName,
  getButtonByName,
  findAllButtonsByName,
  findButtonByName,
};