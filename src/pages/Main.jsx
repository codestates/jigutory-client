import React, { useRef } from 'react';
import { Map } from '../components/Map';
import { Search } from '../components/Search';
import { CafeInfo } from '../components/CafeInfo';
import { ScrollButton } from '../components/ScrollButton';

function Main() {
  const mapMovementRef = useRef();
  const markerManageRef = useRef();
  const cafeToggleRef = useRef();

  return (
    <div className="main-container">
      <Search
        mapMovementRef={mapMovementRef}
        markerManageRef={markerManageRef}
      />
      <Map
        mapMovementRef={mapMovementRef}
        markerManageRef={markerManageRef}
        cafeToggleRef={cafeToggleRef}
      />
      <CafeInfo cafeToggleRef={cafeToggleRef} />
      <ScrollButton />
    </div>
  );
}

export default Main;
