import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import mapMarker from '../images/map-marker.png';
import '../styles/Map.scss';

export const Map = ({ mapMovementRef, markerManageRef, cafeToggleRef }) => {
  const [map, setMap] = useState();
  const [center, setCenter] = useState();
  const [markers, setMarkers] = useState([]);
  let isClicked = false;

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

        const container = document.createElement('div');
        const content = document.createElement('div');
        const contentName = document.createElement('div');
        const closeButton = document.createElement('button');

        container.append(content);
        content.append(contentName);
        content.append(closeButton);

        container.className = 'map-info-container';
        content.className = 'map-info';
        contentName.className = 'map-info-name';
        contentName.textContent = name;
        closeButton.className = 'map-info-close';
        closeButton.textContent = '✕';
        closeButton.onclick = function () {
          closeOverlay();
        };

        const overlay = new window.kakao.maps.CustomOverlay({
          content: container,
          position: latLng,
        });

        function closeOverlay() {
          isClicked = false;
          overlay.setMap(null);
        }
        window.kakao.maps.event.addListener(marker, 'click', function () {
          if (!isClicked) {
            isClicked = true;
          }
          overlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          if (isClicked) {
            return;
          }
          overlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          if (isClicked) {
            return;
          }
          overlay.setMap(null);
        });

        window.kakao.maps.event.addListener(marker, 'click', function () {
          cafeToggleRef.current.toggle(cafeId);
        });
      });
    }
  }, [cafeToggleRef, isClicked, map, markers]);

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
    <>
      <div id="map-container">
        <div id="map" ref={containerRef}></div>
      </div>
    </>
  );
};
