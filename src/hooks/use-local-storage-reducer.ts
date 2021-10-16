import { Reducer, useCallback, useReducer } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";

const useLocalStorageReducer = <S, A>(reducer: Reducer<S, A>, initialState: S, key: string) => {
  const [storedState, storeState] = useLocalStorage(key, initialState);

  const localeStorageReducer = useCallback(
    (state: S, action: A) => {
      const newState = reducer(state, action);
      storeState(newState);
      return newState;
    },
    [reducer, storeState],
  );

  return useReducer(localeStorageReducer, storedState as S);
};

export default useLocalStorageReducer;