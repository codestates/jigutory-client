import React from 'react';
import useClickOutside from '../hooks/useClickOutside';
// import badgeImg from '../images/mypage-badge.png';
import '../styles/BadgeInfo.scss';

export const BadgeInfo = ({ badge, selectedBadgeId, setSelectedBadgeId }) => {
  const handleCloseBadge = () => {
    setSelectedBadgeId();
  };

  let domNode = useClickOutside(() => {
    setSelectedBadgeId();
  });

  if (!selectedBadgeId || !badge) {
    <div>나중에 다시 시도해 주세요! 뱃지를 불러올 수 없어요.</div>;
  }

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