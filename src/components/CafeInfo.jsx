import axios from 'axios';
import { useCallback, useEffect, useImperativeHandle, useState } from 'react';
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
  return (
    <div id="cafe-toggle">
      <div id="cafe-toggle-item">
        <div>{cafe.name}</div>
        <hr />
        <div>{cafe.keyword}</div>
      </div>
      {/* <div id="cafe-toggle-button" onClick></div> */}
    </div>
  );
};
