import React, { useRef } from 'react';
import '../styles/Main.scss';
import { Map } from '../components/Map';
import { Search } from '../components/Search';
import { CafeInfo } from '../components/CafeInfo';

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
    </div>
  );
}

export default Main;
