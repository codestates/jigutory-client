import { useRef, useEffect } from 'react';

const useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let windowHandler = (e) => {
      if (!domNode.current?.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', windowHandler);
    return () => {
      document.removeEventListener('mousedown', windowHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
