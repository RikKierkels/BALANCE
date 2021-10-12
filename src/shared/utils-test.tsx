import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import Theme from "../design/Theme";
import ModalProvider from "../components/Modal/ModalProvider";

const Providers = ({ children }: PropsWithChildren<{}>) => (
  <ModalProvider>
    <Theme>{children}</Theme>
  </ModalProvider>
);

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };