import axios from 'axios';
import { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/CafeInfo.scss';

export const CafeInfo = ({ cafeToggleRef }) => {
  const [toggledCafeId, setToggledCafeId] = useState();
  const [cafe, setCafe] = useState('');

  const fetchCafe = useCallback(async () => {
    const cafeListResponse = await axios.get('http://localhost:4000/cafe/list');
    const findCafe = cafeListResponse.data.find(
      ({ id }) => id === toggledCafeId,
    );
    setCafe(findCafe);
  }, [toggledCafeId]);

  const handleCloseToggle = () => {
    setToggledCafeId();
  };

  let domNode = useClickOutside(() => {
    setToggledCafeId();
  });

  useEffect(() => {
    fetchCafe();
  }, [fetchCafe]);

  useImperativeHandle(cafeToggleRef, () => ({
    toggle: (cafeId) => {
      setToggledCafeId(cafeId);
    },
  }));

  if (!toggledCafeId || !cafe) {
    return <></>;
  }

  const cafeKeywords = cafe.keyword.split(',');
  const cafeType = cafe.type.split(',');

  return (
    <div id="cafe-toggle-container" ref={domNode}>
      <button className="cafe-toggle-close" onClick={handleCloseToggle}>
        <i className="fas fa-times"></i>
      </button>
      <div id="cafe-toggle-info">
        <div id="cafe-toggle-info-image">
          <img src={cafe.image} alt="이미지" />
        </div>
        <div id="cafe-toggle-category">
          <div className="cafe-toggle-category-title">
            <div>{cafe.name}</div>
            <div>
              <i className="fas fa-heart"></i>
              <i className="fas fa-bookmark"></i>
            </div>
          </div>
          <div className="cafe-toggle-category-description">
            <ul>
              {cafeKeywords.map((keyword, idx) => (
                <li
                  key={idx}
                  className="cafe-toggle-category-description-keyword"
                >
                  {keyword}
                </li>
              ))}
            </ul>
            <ul>
              {cafeType.map((keyword, idx) => (
                <li key={idx} className="cafe-toggle-category-description-type">
                  {keyword}
                </li>
              ))}
            </ul>
          </div>
          <div className="cafe-toggle-category-contact">
            <div>
              <i className="fas fa-map-marker-alt"></i> {cafe.address}
            </div>
            <div>
              <i className="fas fa-phone-alt"></i> {cafe.telephone}
            </div>
          </div>
          <a
            className="cafe-toggle-category-link"
            href={cafe.link}
            target="_black"
          >
            <i className="fas fa-home"></i> {cafe.name} 홈페이지
          </a>
        </div>
      </div>
    </div>
  );
};
