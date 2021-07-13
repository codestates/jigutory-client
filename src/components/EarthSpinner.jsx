import React from 'react';
import '../styles/Spinners.scss';

const EarthSpinner = () => {
  return (
    <div className="common_alert_loading">
      {/* <div>로딩 중입니다.</div> */}
      <div className="loading_earth"></div>
    </div>
  );
}

export default EarthSpinner;