import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import mapMarker from '../images/main-marker.png';
import '../styles/Map.scss';

export const Map = ({ mapMovementRef, markerManageRef, cafeToggleRef }) => {
  const [map, setMap] = useState();
  const [center, setCenter] = useState();
  const [markers, setMarkers] = useState([]);

  const containerRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCenter({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (center) {
      const latLng = center
        ? new window.kakao.maps.LatLng(center.lat, center.lng)
        : new window.kakao.maps.LatLng(37.55624134907669, 126.9723973896144);
      const options = {
        center: latLng,
        level: 7,
      };
      setMap(new window.kakao.maps.Map(containerRef.current, options));
    }
  }, [center]);

  useEffect(() => {
    if (map) {
      markers.forEach(({ lat, lng, cafeId, name }) => {
        const markerImageUrl = mapMarker;
        const markerImageSize = new window.kakao.maps.Size(40, 45);
        const markerImageOptions = {
          offset: new window.kakao.maps.Point(20, 42),
        };

        const markerImage = new window.kakao.maps.MarkerImage(
          markerImageUrl,
          markerImageSize,
          markerImageOptions,
        );

        const latLng = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: latLng,
          image: markerImage,
          clickable: true,
        });
        marker.setMap(map);

        const overlay = new window.kakao.maps.CustomOverlay({
          content: name,
          map: map,
          position: latLng,
          // position: marker.getPosition()
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          overlay.setMap(map);
        });

        function closeOverlay() {
          overlay.setMap(null);
        }

        // const iwRemoveable = true;
        // const infoWindow = new window.kakao.maps.InfoWindow({
        //   position: latLng,
        //   content: name,
        //   removable: iwRemoveable,
        // });

        // window.kakao.maps.event.addListener(
        //   marker,
        //   'mouseover',
        //   (function () {
        //     return function () {
        //       infoWindow.open(map, marker);
        //     };
        //   })(map, marker, infoWindow),
        // );

        // window.kakao.maps.event.addListener(
        //   marker,
        //   'mouseout',
        //   (function () {
        //     return function () {
        //       infoWindow.close();
        //     };
        //   })(infoWindow),
        // );

        // window.kakao.maps.event.addListener(
        //   marker,
        //   'click',
        //   (function () {
        //     return function () {
        //       infoWindow.open(map, marker);
        //     };
        //   })(map, marker, infoWindow),
        // );

        window.kakao.maps.event.addListener(marker, 'click', function () {
          cafeToggleRef.current.toggle(cafeId);
        });

        const clusterer = new window.kakao.maps.MarkerClusterer({
          map: map,
          averageCenter: true,
          minLevel: 10, // 클러스터 할 최소 지도 레벨
        });

        // // 데이터를 가져오기 위해 jQuery를 사용합니다
        // // 데이터를 가져와 마커를 생성하고 클러스터러 객체에 넘겨줍니다
        // $.get('/download/web/data/chicken.json', function (data) {
        //   // 데이터에서 좌표 값을 가지고 마커를 표시합니다
        //   // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
        //   var markers = $(data.positions).map(function (i, position) {
        //     return new kakao.maps.Marker({
        //       position: new kakao.maps.LatLng(position.lat, position.lng),
        //     });
        //   });

        // // 클러스터러에 마커들을 추가합니다
        // clusterer.addMarkers(markers);
        // });
      });
    }
  }, [cafeToggleRef, map, markers]);

  useImperativeHandle(mapMovementRef, () => ({
    move: (lat, lng) => {
      const latLng = new window.kakao.maps.LatLng(lat, lng);
      map.panTo(latLng);
    },
  }));
  useImperativeHandle(markerManageRef, () => ({
    addMarker: (lat, lng, cafeId, name) => {
      setMarkers((prev) => [...prev, { lat, lng, cafeId, name }]);
    },
  }));

  return (
    <div id="map-container">
      <div id="map" ref={containerRef}></div>
    </div>
  );
};
