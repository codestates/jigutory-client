import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import mapMarker from '../images/marker_lightblue.png';
import EarthSpinner from './EarthSpinner';
import '../styles/Map.scss';

export const Map = ({ mapMovementRef, markerManageRef, cafeToggleRef }) => {
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let isClicked = false;

  const containerRef = useRef();

  useEffect(() => {
    const latLng = new window.kakao.maps.LatLng(
      37.55624134907669,
      126.9723973896144,
    );
    const options = {
      center: latLng,
      level: 7,
    };
    setMap(new window.kakao.maps.Map(containerRef.current, options));
  }, []);

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

        // const clusterer = new window.kakao.maps.MarkerClusterer({
        //   map: map,
        //   averageCenter: true,
        //   minLevel: 10,
        // });

        // clusterer.addMarkers(markers);
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
        {/* <EarthSpinner /> */}
        <div id="map" ref={containerRef}></div>
      </div>
    </>
  );
};
