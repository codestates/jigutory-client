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

  // map & search 연결
  useImperativeHandle(cafeToggleRef, () => ({
    toggle: (cafeId) => {
      setToggledCafeId(cafeId);
    },
  }));

  if (!toggledCafeId || !cafe) {
    return <></>;
  }

  const cafeKeywords = cafe.keyword.split(',');
  return (
    <div id="cafe-toggle_container" ref={domNode}>
      <div id="cafe-toggle_info">
        <div id="cafe-toggle_imgbox">
          <img src={cafe.image} alt="이미지" />
        </div>
        <div onClick={handleCloseToggle}>close</div>
        <div id="cafe-toggle_desc">
          <div className="cafe-toggle_desc_title">
            <div>{cafe.name}</div>
            <div className="cafe-toggle_desc_title_iconbox">
              <i className="fas fa-heart"></i>
              <i className="fas fa-bookmark"></i>
            </div>
          </div>
          <ul className="cafe-toggle_desc_keyword">
            {cafeKeywords.map((keyword, idx) => (
              <li key={idx} className="keywords_keyword">
                {keyword}
              </li>
            ))}
          </ul>
          <a href={cafe.link} target="_black">
            홈페이지로 이동
          </a>
          <div>{cafe.review}</div>
          <div>{cafe.address}</div>
          {/* <div>{cafe.description}</div> */}
        </div>
      </div>
    </div>
  );
};
