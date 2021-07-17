import React from 'react';
import tumbler1 from '../images/텀블러.png';
import tumblers2 from '../images/텀블러2.png';
import tumbler3 from '../images/텀블러3.png';
import shopping from '../images/shopping.png';
import forest from '../images/forest_onhands.png';
import tumblers from '../images/tumblers.png';
import { useHistory, withRouter } from 'react-router-dom';
import '../styles/IntroEnding.scss';

const IntroStore = () => {
  const history = useHistory();
  return (
    <section className="intro_store">
      <div className="intro_store-tumblers">
        {/* <img src={tumbler1} alt="item3" />
        <img src={tumblers2} alt="item3" />
        <img src={tumbler3} alt="item3" /> */}
        <img src={tumblers} alt="tumblers" />

        {/* <img src={shopping} alt="shopping" /> */}
      </div>

      <div className="intro_store-desc1">
        <p>
          다양한 텀블러가 있는 지구토리 상점에서 나만의 텀블러를 골라보세요 !
        </p>
      </div>

      <div className="intro_store-forest">
        <img src={forest} alt="forest" width="100px" />
      </div>

      <div className="intro_store-desc2">
        <p>
          일회용 컵 대신 텀블러를 사용하여 지구를 지키는데 한 걸음 나아가세요 !
        </p>
      </div>

      <div className="intro_store-desc3">
        <p>
          텀블러 판매 수익의 일부는 환경보호 단체를 통해 지구를 지키는데
          쓰입니다.
        </p>
      </div>
      <button id="intro_end-movetoshop" onClick={() => history.push('/store')}>상점 바로가기</button>

    </section>
  );
};

export default withRouter(IntroStore);
