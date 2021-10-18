import { render, screen } from "../../shared/utils-test";
import Modal from "./Modal";

const root = document.createElement("div");
root.setAttribute("id", "modal-root");

test("when container element is not present, throws an error", () => {
  expect(() => render(<Modal />)).toThrowError("Error rendering <Modal/>. Cannot find an element with id: modal-root.");
});

test("when a title is provided, renders a title", () => {
  render(<Modal title="Title is rendered" />, { container: document.body.appendChild(root) });

  expect(screen.queryAllByRole("heading")).toHaveLength(1);
  expect(screen.getByText(/title is rendered/i)).toBeInTheDocument();
});

test("when no title is provided, doesn't render a title", () => {
  render(<Modal />, { container: document.body.appendChild(root) });

  expect(screen.queryAllByRole("heading")).toHaveLength(0);
});