import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

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
    const latLng = center
      ? new window.kakao.maps.LatLng(center.lat, center.lng)
      : new window.kakao.maps.LatLng(37.5909966, 127.2364496);
    const options = {
      center: latLng,
      level: 3,
    };
    setMap(new window.kakao.maps.Map(containerRef.current, options));
  }, [center]);

  useEffect(() => {
    if (map) {
      markers.forEach(({ lat, lng, cafeId }) => {
        const latLng = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: latLng,
        });

        marker.setMap(map);
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
    addMarker: (lat, lng, cafeId) => {
      setMarkers((prev) => [...prev, { lat, lng, cafeId }]);
    },
  }));

  return <div id="map" ref={containerRef}></div>;
};
