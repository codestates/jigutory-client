import React from 'react';
import mapGif from '../images/intro-function-map.gif';
import '../styles/IntroMap.scss';

export const IntroMap = () => {
  return (
    <div className="intro_main">
      <div className="intro_main-image">
        <div className="intro_main-image-content">
          <div>세계적으로 버려지는 연간 플라스틱</div>
          <div>약 2억 4천만톤...</div>
          <div>한국 연간 일회용 플라스틱 컵 사용량</div>
          <div>33억개...</div>
        </div>
      </div>
      <div className="intro_main-function-map">
        <div className="intro_main-function-map-content">
          <div>텀블러 할인 카페 찾기</div>
          <div>
            카테고리를 선택해 빠르고 쉽게
            <br />
            텀블러 할인 카페를 찾아보세요!
          </div>
        </div>
        <div className="intro_main-function-map-gif">
          <img src={mapGif} alt="지도 gif"></img>
        </div>
      </div>
    </div>
  );
};
