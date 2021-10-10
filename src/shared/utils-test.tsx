import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import Theme from "../design/Theme";

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Theme, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };