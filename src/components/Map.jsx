import axios from 'axios';
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

        const closeOverlay = function () {
          overlay.setMap(null);
        };

        const div = document.createElement('div');

        div.classList.add('wrap');

        const content =
          '<div className="map-container">' +
          '    <div className="map-info">' +
          '        <div className="map-info-name">' +
          '            name' +
          '            <div className="map-info-close" onclick={closeOverlay}>' +
          '                <i className="fas fa-times"></i>' +
          '            </div>' +
          '        </div>' +
          '    </div>' +
          '</div>';

        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: latLng,
          // position: marker.getPosition()
        });

        window.kakao.maps.event.addListener(marker, 'click', function () {
          overlay.setMap(map);
        });

        // const iwRemoveable = true;
        // const infoWindow = new window.kakao.maps.InfoWindow({
        //   position: latLng,
        //   content: name,
        //   removable: iwRemoveable,
        // });
        // marker.setMap(map);

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

        // axios.get('/download/web/data/chicken.json', function (data) {
        //   var markers = data.positions.map(function (i, position) {
        //     return new window.kakao.maps.Marker({
        //       position: new window.kakao.maps.LatLng(
        //         position.lat,
        //         position.lng,
        //       ),
        //     });
        //   });

        //   clusterer.addMarkers(markers);
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
