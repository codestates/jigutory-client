import React from 'react';
import searchImg from '../images/Search.svg';
import mapImg from '../images/Navigation.svg';
import '../styles/IntroMap.scss';

const IntroMap = () => {
  return (
    <section className="intro_main">
      <section className="intro_main-map">
        <div className="intro_main-map-first">
          <div className="intro_main-map-first-image" data-aos="fade-up">
            <img src={searchImg} alt="랜딩페이지 검색"></img>
          </div>
          <div className="intro_main-map-first-content" data-aos="fade-up">
            <div>카페명/할인금액/가게분류</div>
            <div>
              카테고리를 선택하고 <span>검색</span>하세요!
            </div>
          </div>
        </div>
        <div className="intro_main-map-second">
          <div className="intro_main-map-second-content" data-aos="fade-up">
            <span>텀블러 사용혜택</span>을 주는
            <br />
            카페와 제로웨이스트샵을 찾아보세요!
          </div>
          <div className="intro_main-map-second-image" data-aos="fade-up">
            <img src={mapImg} alt="랜딩페이지 지도"></img>
          </div>
        </div>
      </section>
    </section>
    // <section className="intro_main">
    //   <section className="intro_main-function-map">
    //     <div className="intro_main-function-map-gif">
    //       <img src={mapGif} alt="지도 gif"></img>
    //     </div>
    //     <div className="intro_main-function-map-content">
    //       <div>
    //         지구토리의 지도를 통해 <br />
    //         텀블러 사용혜택이 가득한 카페와 <br />
    //         제로 웨이스트를 실천하고 있는 매장을 찾아보고 <br />
    //         할인 금액별 카페도 조회해보세요!
    //       </div>
    //     </div>
    //   </section>
    // </section>
  );
};

export default IntroMap;
