import { jest } from "@jest/globals";
import { act, renderHook } from "@testing-library/react-hooks";
import useLocalStorageReducer from "./use-local-storage-reducer";

const spiedStorageSetter = jest.spyOn(Storage.prototype, "setItem");
beforeEach(spiedStorageSetter.mockClear);

type State = { count: number };
type Action = { type: "increment" };
const initialState = (): State => ({ count: 0 });

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: ++state.count };
  }
};

test("stores the initial state in the local storage", () => {
  renderHook(() => useLocalStorageReducer(reducer, initialState(), "key"));

  expect(spiedStorageSetter).toHaveBeenCalledWith("key", JSON.stringify(initialState()));
});

test("stores a new state in the local storage", () => {
  const {
    result: {
      current: [_, dispatch],
    },
  } = renderHook(() => useLocalStorageReducer(reducer, initialState(), "key"));

  act(() => dispatch({ type: "increment" }));

  expect(spiedStorageSetter).toHaveBeenCalledWith("key", JSON.stringify({ count: 1 }));
});