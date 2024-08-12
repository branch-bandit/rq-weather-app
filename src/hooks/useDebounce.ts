import { useEffect, useState } from 'react';

export const useDebounce = (
  value: string,
  valueTrimmed: string,
  delay: number
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [valueTrimmed, delay]);

  return debouncedValue;
};
