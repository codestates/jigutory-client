import React, { useState } from 'react';
import scrollBtn from '../images/scroll-btn.png';
import '../styles/ScrollButton.scss';

export const ScrollButton = () => {
  const [scroll, setScroll] = useState(0);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScroll(0);
  };

  return (
    <div className="scroll-container">
      <div className="scroll-btn" onClick={handleScrollUp}>
        <img src={scrollBtn} alt="TOP"></img>
      </div>
    </div>
  );
};
