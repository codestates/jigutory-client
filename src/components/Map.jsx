import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import mapMarker from '../images/main-marker.png';

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

        const iwRemoveable = true;
        const infoWindow = new window.kakao.maps.InfoWindow({
          position: latLng,
          content: name,
          removable: iwRemoveable,
        });

        marker.setMap(map);

        window.kakao.maps.event.addListener(
          marker,
          'mouseover',
          (function () {
            return function () {
              infoWindow.open(map, marker);
            };
          })(map, marker, infoWindow),
        );

        window.kakao.maps.event.addListener(
          marker,
          'mouseout',
          (function () {
            return function () {
              infoWindow.close();
            };
          })(infoWindow),
        );

        window.kakao.maps.event.addListener(
          marker,
          'click',
          (function () {
            return function () {
              infoWindow.open(map, marker);
            };
          })(map, marker, infoWindow),
        );

        window.kakao.maps.event.addListener(marker, 'click', function () {
          cafeToggleRef.current.toggle(cafeId);
        });
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
