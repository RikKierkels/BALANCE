import { useRef } from "react";
import useKey from "react-use/lib/useKey";

const useShortcut = <T extends HTMLElement>(key: string, onKeyPress: (element: T) => void) => {
  const ref = useRef<T>(null);
  useKey(key, () => ref?.current && onKeyPress(ref.current));
  return ref;
};

export default useShortcut;