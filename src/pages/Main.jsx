import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import '../styles/Map.scss';

const { kakao } = window;

function Map() {
  const [LatLng, setLatLng] = useState([37.51040624439627, 127.05862531328155]);
  const [map, setMap] = useState({});
  const [mapLevel, setMapLevel] = useState(3);
  const [dataMarker, setDataMarker] = useState([]);
  const [markerList, setMarkerList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchLatLng, setSearchLatLng] = useState([
    37.51040624439627, 127.05862531328155,
  ]);

  useEffect(() => {
    kakao.maps.load(() => {
      loadKakaoMap();
    });
  });

  function loadKakaoMap() {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(LatLng[0], LatLng[1]), //지도의 중심좌표
      level: mapLevel, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 & 객체 리턴

    const mapTypeControl = new kakao.maps.MapTypeControl(); // 일반 지도, 스카이뷰
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new kakao.maps.ZoomControl(); // 확대, 축소
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setMap(map);
  }

  // DB에 저장된 가게들
  // useEffect(() => {
  //   axios
  //     .get(`https://localhost:4000/main`)
  //     .then((body) => {
  //       setMarkerList(body);
  //     })
  //     .catch((err) => console.error(err));
  // }, [markerList]);

  function viewMarkers() {
    const markerList = [];
    const position = new kakao.maps.LatLng(37.497079, 127.023495);
    const image = new window.kakao.maps.MarkerImage(
      `/images/marker/post-marker.png`,
      new window.kakao.maps.Size(45, 45),
      { offset: new window.kakao.maps.Point(8, 50) },
    );
    const marker = new kakao.maps.Marker({
      map,
      position,
      image,
    });

    const iwContent = '<div class="markerInfo">' + '덕분애' + '</div>';

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      zIndex: 999,
    });

    kakao.maps.event.addListener(marker, 'mouseover', function () {
      infowindow.open(map, marker);
    });

    kakao.maps.event.addListener(marker, 'mouseout', function () {
      infowindow.close();
    });
    marker.setMap(map);
    markerList.push(marker);
    setDataMarker(markerList);
  }

  viewMarkers();

  return <div id="map" style={{ width: '700px', height: '700px' }}></div>;
}

export default Map;
