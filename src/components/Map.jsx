import React, { useCallback, useEffect, useState } from 'react';

export const Map = () => {
  const [map, setMap] = useState({});
  const [latLng, setLatLng] = useState([37.51040624439627, 127.05862531328155]);
  const [mapLevel, setMapLevel] = useState(3);

  const loadKakaoMap = useCallback(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(latLng[0], latLng[1]), //지도의 중심좌표
      level: mapLevel, //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption); //지도 생성 & 객체 리턴

    const mapTypeControl = new window.kakao.maps.MapTypeControl(); // 일반 지도, 스카이뷰
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new window.kakao.maps.ZoomControl(); // 확대, 축소
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    setMap(map);
  }, [latLng, mapLevel]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      loadKakaoMap();
    });
  }, [loadKakaoMap]);
  return <></>;
};
