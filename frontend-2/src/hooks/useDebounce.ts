import { useEffect, useState } from "react";

const useDebounce = <T>(cb: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(cb);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(cb);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [cb, delay]);
  return debouncedValue;
};

export default useDebounce;
