import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import holdingcup from '../images/cup.png';
import '../styles/IntroEnding.scss';

const IntroEnding = () => {
  const history = useHistory();
  const [totalCnt, setTotalCnt] = useState({
    totalCarbon: '',
    totalClicks: '',
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + `/intropage`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setTotalCnt({
          totalCarbon: res.data.totalCarbon,
          totalClicks: res.data.totalClicks,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="intro_end">
      <div className="intro_end-desc">
        <img src={holdingcup} alt="img" data-aos="fade-up" />
        <p data-aos="fade-up">
          지구토리는 <br />
          <span>{totalCnt.totalClicks}</span>개의 일회용 컵 사용을 줄였고,{' '}
          <br />
          <span>{totalCnt.totalCarbon}</span>g의 탄소배출을 저감했습니다.
        </p>
        <div data-aos="fade-up">
          작은 행동 하나가 모여 지구를 살립니다. <br /> 지금 지구토리와
          함께하세요 !
        </div>
      </div>
      <div className="intro_end-btns" data-aos="fade-up">
        <button id="intro_end-movetomap" onClick={() => history.push('/main')}>
          시작하기
        </button>
        <button
          id="intro_end-movetoshop"
          onClick={() => history.push('/store')}
        >
          텀블러 구매하기
        </button>
      </div>
    </section>
  );
};

export default withRouter(IntroEnding);
