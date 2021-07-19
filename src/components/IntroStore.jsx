import React from 'react';
import forest from '../images/forest_onhands.png';
import tumblers from '../images/tumblers.png';
import { useHistory, withRouter } from 'react-router-dom';
import '../styles/IntroEnding.scss';

const IntroStore = () => {
  const history = useHistory();
  return (
    <section className="intro_store">
      <div className="intro_store-tumblers" data-aos="fade-up"></div>
      <div className="intro_store-desc1" data-aos="fade-up">
        <p>지구토리 상점에서 나만의 텀블러를 골라보세요 !</p>
      </div>
      {/* <img src={tumblers} alt="tumblers" width="150px" /> */}
      <div className="intro_store-forest" data-aos="fade-up">
        <img src={forest} alt="forest" width="100px" />
      </div>
      <div className="intro_store-desc2" data-aos="fade-up">
        <p>
          일회용 컵 대신 텀블러를 사용하여 지구를 지키는데 한 걸음 나아가세요.
        </p>
      </div>
      <div className="intro_store-desc3" data-aos="fade-up">
        <p>
          텀블러 판매 수익의 일부는 환경보호 단체를 통해 지구를 지키는데
          쓰입니다.
        </p>
      </div>
      <button
        id="intro_end-movetoshop"
        onClick={() => history.push('/store')}
        data-aos="fade-up"
      >
        상점 바로가기
      </button>
    </section>
  );
};

export default withRouter(IntroStore);
