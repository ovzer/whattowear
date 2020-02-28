import { useState, useEffect } from 'react';

export const useDebounce = (value: string | null, timeout: number): string | null => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);

    return () => clearTimeout(handler);
  }, [timeout, value]);

  return state;
};
