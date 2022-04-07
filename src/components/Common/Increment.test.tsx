import React from "react";
import { render, screen } from "../../shared/utils-test";
import Increment from "./Increment";

test.each([undefined, 0])("without a value, renders nothing", (value) => {
  const { container } = render(<Increment value={value} formatter={() => []} />);

  expect(container.firstChild).toBeEmptyDOMElement();
});

test("without parts, renders nothing", () => {
  const { container } = render(<Increment value={5} formatter={() => []} />);

  expect(container.firstChild).toBeEmptyDOMElement();
});

test("with all zero number parts, renders nothing", () => {
  const { container } = render(
    <Increment
      value={10}
      formatter={() => [
        { type: "currency", value: "€" },
        { type: "plusSign", value: "+" },
        { type: "integer", value: "0" },
        { type: "decimal", value: "," },
        { type: "fraction", value: "00" },
      ]}
    />,
  );

  expect(container.firstChild).toBeEmptyDOMElement();
});

test("with parts, renders the parts as a string", () => {
  render(
    <Increment
      value={103.99}
      formatter={() => [
        { type: "currency", value: "€" },
        { type: "plusSign", value: "+" },
        { type: "integer", value: "103" },
        { type: "decimal", value: "," },
        { type: "fraction", value: "99" },
      ]}
    />,
  );

  expect(screen.getByText("€+103,99")).toBeInTheDocument();
});