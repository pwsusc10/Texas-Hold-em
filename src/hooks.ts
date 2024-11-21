import { useEffect, useRef } from 'react';

export default function useOutSideRef<T extends HTMLDivElement | HTMLImageElement | HTMLButtonElement>(handleClick: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClick();
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClick]);

  return ref;
}
