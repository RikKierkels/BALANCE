import React, { PropsWithChildren } from "react";
import { render, queries, RenderOptions, BoundFunctions, screen, within } from "@testing-library/react";
import * as customQueries from "./custom-queries";
import Theme from "../design/Theme";
import ModalProvider from "../components/Modal/ModalProvider";
import AppStateProvider from "../AppStateProvider";

const AllProviders = ({ children }: PropsWithChildren<{}>) => (
  <Theme>
    <div id="modal-root" />
    <AppStateProvider>
      <ModalProvider>{children}</ModalProvider>
    </AppStateProvider>
  </Theme>
);

const boundQueries = Object.entries(customQueries).reduce((queries, [queryName, queryFn]) => {
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  queries[queryName] = queryFn.bind(null, document.body);
  return queries;
}, {} as BoundFunctions<typeof customQueries>);

const customScreen = { ...screen, ...boundQueries };
const customWithin = (element: HTMLElement) => within(element, { ...queries, ...customQueries });
const customRender = (ui: React.ReactElement, options: Omit<RenderOptions, "queries"> = {}) =>
  render(ui, { wrapper: AllProviders, queries: { ...queries, ...customQueries }, ...options });

export * from "@testing-library/react";
export { customScreen as screen };
export { customWithin as within };
export { customRender as render };

export const hideConsoleError = (fn: (...args: any[]) => void) => {
  const spiedConsoleError = jest.spyOn(console, "error");
  spiedConsoleError.mockImplementation(() => {});
  fn();
  spiedConsoleError.mockRestore();
};