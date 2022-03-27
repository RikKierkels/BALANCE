import { useRef } from "react";
import useKey from "react-use/lib/useKey";

const useShortcut = <T extends HTMLElement>(key: string, onKeyPress: (element: T) => void) => {
  const ref = useRef<T>(null);
  useKey(key, () => setTimeout(() => ref?.current && onKeyPress(ref.current), 0));
  return ref;
};

export default useShortcut;