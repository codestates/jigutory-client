import React from 'react';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/LevelInfo.scss';

const LevelInfo = ({ levelInfo, handleCloseModal }) => {
  console.log('levelinfo component props ', levelInfo);
  const domNode = useClickOutside(() => {
    handleCloseModal();
  });

  return (
    <div className="level_container level_hide level_show-modal">
      <div ref={domNode} className="level_modal">
        <div id="level_modal-info">
          <section>
            <div id="level_img">
              <img src={levelInfo.image} alt="레벨이미지" width="100px" />
            </div>
            <div id="level_level_name">
              Lv.{levelInfo.level} {levelInfo.name}
            </div>
            <div id="level_desc" className="hide">
              {levelInfo.description}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LevelInfo;

