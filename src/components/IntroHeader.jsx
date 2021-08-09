import React from 'react';
import mapGif from '../images/intro-function-map.gif';

const IntroHeader = () => {
  return (
    <section className="intro_main">
      <section className="intro_main-function">
        <div className="intro_main-function-image">
          <img src={mapGif} alt="지도 gif"></img>
        </div>
        <div className="intro_main-function-content">
          <div id="intro_main-header">텀블러 사용을 더 편리하고 재미있게</div>
          <div id="intro_main-desc">
            지구를 지키는 한 걸음, <span>지구토리</span>와 함께하세요 !
          </div>
          <p>
            <div>국내 연간 일회용 플라스틱 컵 사용량 33억개 </div>
            <div>
              일회용 컵 대신 텀블러를 사용하면 연간 나무 0.5그루를 심는 효과가
              있습니다.
            </div>
          </p>
        </div>
      </section>
    </section>
  );
};

export default IntroHeader;
