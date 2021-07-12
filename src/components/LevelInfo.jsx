import React, { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/LevelInfo.scss';

const LevelInfo = ({ levelInfo, handleCloseModal }) => {
  console.log('levelinfo component props ', levelInfo)
  // modal 상태
  const domNode = useClickOutside(() => {
    handleCloseModal();
  })

  const showDescription = () => {
    console.log('자세히보기 클릭');
  }

  // const splitDescription = levelInfo.description.split('.');
  // const splited = splitDescription.slice(0, splitDescription.length - 1);

  return (
    <div className="level_container level_hide level_show-modal">
      <div ref={domNode} className="level_modal">
        <div id="level_modal-info">
          {/* <section id="level_img"><img src={levelInfo.image} /></section> */}
          <section >
            <div id="level_img"><img src={levelInfo.image} width="100px" /></div>
            <div id="level_level_name">Lv.{levelInfo.level} {levelInfo.name}</div>
            {/*<button>🔽 자세히 보기</button> */}
            <div id="level_desc" className="hide">{levelInfo.description}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default LevelInfo;

// <div id="level_desc" className="hide">{splited.map((row, idx) => (<span id="level_desc_row" key={idx}>{row}.</span>))}</div>