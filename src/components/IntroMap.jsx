import React from 'react';
import mapGif from '../images/intro-function-map.gif';
import mainImg from '../images/trash_by jasmin-sessler.jpg';
import '../styles/IntroMap.scss';

const IntroMap = () => {
  return (
    <section className="intro_main">
      <section className="intro_main-image">
        <div className="intro_main-image-content">
          <div>세계적으로 버려지는 연간 플라스틱</div>
          <div>약 2억 4천만톤...</div>
          <div>한국 연간 일회용 플라스틱 컵 사용량</div>
          <div>33억개...</div>
        </div>
        <img src={mainImg} alt="랜딩 이미지"></img>
      </section>

      <section className="intro_main-function-map">

        <div className="intro_main-function-map-gif">
          <img src={mapGif} alt="지도 gif"></img>
        </div>

        <div className="intro_main-function-map-content">
          <div>지구토리의 지도를 통해 <br />

            텀블러 사용혜택이 가득한 카페와 <br />
            제로 웨이스트를 실천하고 있는 매장을 찾아보고 <br />
            할인 금액별 카페도 조회해보세요!
          </div>
        </div>

      </section>
    </section>
  );
};

export default IntroMap;
