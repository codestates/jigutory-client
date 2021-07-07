import React, { useEffect, useState, useCallback } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import axios from 'axios';

export const BadgeInfo = ({ accessToken }) => {
  const [clickedBadgeId, setClickedBadgeId] = useState();
  const [badge, setBadge] = useState('');
  const [email, setEmail] = useState('');

  const fetchBadge = useCallback(async () => {
    const badgeListResponse = await axios.post(
      'http://localhost:4000/badge/read',
      { email: email },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken,
        },
      },
    );
    // const findBadge = badgeListResponse.data.badgeAll.find(
    //   ({ id }) => id === clickedBadgeId,
    // );
    setBadge(badgeListResponse);
    console.log('badge: ', badgeListResponse.data.badgeAll);
  }, [accessToken, email]);

  const handleCloseModal = () => {
    setClickedBadgeId();
  };

  let domNode = useClickOutside(() => {
    setClickedBadgeId();
  });

  useEffect(() => {
    fetchBadge();
  }, [fetchBadge]);

  if (!clickedBadgeId || !badge) {
    return <></>;
  }

  return (
    <div id="badge-modal-container" ref={domNode}>
      <button className="badge-modal-close" onClick={handleCloseModal}>
        <i className="fas fa-times"></i>
      </button>
      <div id="badge-modal-info">
        <div id="badge-modal-info-name">{badge.name}</div>
        <div id="badge-modal-info-description">{badge.description}</div>
        <div id="badge-modal-info-image">
          <img src={badge.image} alt="뱃지 모달 이미지" />
        </div>
      </div>
    </div>
  );
};
