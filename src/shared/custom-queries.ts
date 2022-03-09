import { buildQueries, within, ByRoleOptions, Matcher, SelectorMatcherOptions } from "@testing-library/react";
import { ByRoleMatcher } from "@testing-library/dom/types/matches";

const roleByNameQueryAll =
  (role: ByRoleMatcher) => (container: HTMLElement, name: ByRoleOptions["name"], args: Omit<ByRoleOptions, "name">) =>
    within(container).getAllByRole(role, { name, ...args });

const [queryButtonByName, getAllButtonsByName, getButtonByName, findAllButtonsByName, findButtonByName] = buildQueries(
  roleByNameQueryAll("button"),
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
  (_, value) => `Found multiple labels for text: ${value}`,
  (_, value) => `Unable to find a label for text: ${value}`,
);

export {
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