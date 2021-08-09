import React from 'react';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/BadgeInfo.scss';

export const BadgeInfo = ({ badge, selectedBadgeId, setSelectedBadgeId }) => {
  const handleCloseBadge = () => {
    setSelectedBadgeId();
  };

  let domNode = useClickOutside(() => {
    setSelectedBadgeId();
  });

  return (
    <div id="badge-container" ref={domNode}>
      <div className="badge-info" onClick={() => setSelectedBadgeId(badge.id)}>
        <img src="#" alt="뱃지 이미지"></img>
        <div className="badge-info-name">뱃지 획득 조건</div>
      </div>
      {selectedBadgeId === badge.id && (
        <div id="badge-modal">
          <div className="badge-modal-flex">
            <button className="badge-modal-close" onClick={handleCloseBadge}>
              <i className="fas fa-times"></i>
            </button>
            <div className="badge-modal-info-name">{badge.name}</div>
            <div className="badge-modal-info-description">
              {badge.description}
            </div>
            <img src={badge.image} alt="뱃지 모달 이미지" />
          </div>
        </div>
      )}
    </div>
  );
};
