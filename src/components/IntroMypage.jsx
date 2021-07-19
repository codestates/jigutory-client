import React from 'react';
import gif from '../images/speed_mypage_gif.gif';
import turtle from '../images/turtle.png';
import '../styles/IntroEnding.scss';

const IntroMypage = () => {
  return (
    <section className="intro_mypage">
      <div className="intro_mypage-gif" data-aos="fade-up">
        <img src={gif} alt="mypage-gif" />
      </div>

      <div className="intro_mypage-desc-box" data-aos="fade-up">
        {/* <img src={turtle} alt="sea turtle" /> */}
        <div className="intro_mypage-desc1">
          {/* 
          <div>지구토리 유저가 되어 </div>
          <dizv>
            <span>나의 환경지킴 지수</span>를 확인하세요 !
          </dizv>

          <div>
            텀블러 사용 횟수를 기록하여 나의 탄소 저람량을 확인하고 레벨과 뱃지를 획득하세요 !
          </div> */}
          <p>
            <span>텀블러 사용 횟수</span>를 기록하세요 ! <br />
            레벨과 뱃지를 획득할 수 있습니다.
            <br />
          </p>
        </div>

        <div className="intro_mypage-desc2">
          <p>
            지구토리는 멸종위기의 동식물을 위한 활동을 매년 지속하고 있습니다.{' '}
            <br />
          </p>
          <p>유저 레벨과 뱃지 클릭하여 멸종위기 동∙식물들을 확인하세요.</p>
        </div>
      </div>
    </section>
  );
};

export default IntroMypage;
