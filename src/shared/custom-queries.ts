import { buildQueries, within, ByRoleOptions, Matcher, SelectorMatcherOptions } from "@testing-library/react";
import { ByRoleMatcher } from "@testing-library/dom/types/matches";

const elementWithRoleByNameQueryAll =
  (role: ByRoleMatcher) => (container: HTMLElement, name: ByRoleOptions["name"], args: Omit<ByRoleOptions, "name">) =>
    within(container).getAllByRole(role, { name, ...args });
const textInputByNameQueryAll = elementWithRoleByNameQueryAll("textbox");
const numberInputByNameQueryAll = elementWithRoleByNameQueryAll("spinbutton");
const buttonByNameQueryAll = elementWithRoleByNameQueryAll("button");

const [queryTextInputByName, getAllTextInputsByName, getTextInputByName, findAllTextInputsByName, findTextInputByName] =
  buildQueries(
    textInputByNameQueryAll,
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
  numberInputByNameQueryAll,
  (_, value) => `Found multiple number inputs with a name of: ${value}`,
  (_, value) => `Unable to find a number input with a name of: ${value}`,
);

const [queryButtonByName, getAllButtonsByName, getButtonByName, findAllButtonsByName, findButtonByName] = buildQueries(
  buttonByNameQueryAll,
  (_, value) => `Found multiple buttons with a name of: ${value}`,
  (_, value) => `Unable to find a button with a name of: ${value}`,
);

const [
  queryLabelByLabelText,
  getAllLabelsByLabelText,
  getLabelByLabelText,
  findAllLabelsByLabelText,
  findLabelByLabelText,
] = buildQueries(
  (container: HTMLElement, id: Matcher, options?: SelectorMatcherOptions) =>
    within(container)
      .getAllByLabelText(id, options)
      .map((input) => input.closest("label")!),
  (_, value) => `Found multiple labels with a name of: ${value}`,
  (_, value) => `Unable to find a label with a name of: ${value}`,
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
  queryLabelByLabelText,
  getAllLabelsByLabelText,
  getLabelByLabelText,
  findAllLabelsByLabelText,
  findLabelByLabelText,
};