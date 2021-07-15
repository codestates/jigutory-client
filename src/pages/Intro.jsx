import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { ScrollButton } from '../components/ScrollButton';
import axios from 'axios';

function Intro() {
  const history = useHistory();
  const [totalCnt, setTotalCnt] = useState({
    totalCarbon: '',
    totalClicks: '',
  })

  useEffect(() => {
    axios.get('http://localhost:4000/intropage', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        // console.log('total count : ', res);
        setTotalCnt({
          totalCarbon: res.data.totalCarbon,
          totalClicks: res.data.totalClicks
        });
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <section className="intro-container">

        <div className="intro-functions">
          <h2>지구토리 서비스 사용법</h2>
        </div>

        <div className="intro-purpose">
          <h2>지구토리 서비스 목적</h2>
        </div>

        <div className="intro-join">
          <h2>지구토리 시작하기</h2>
        </div>

        <div className="intro-review">
          <h2>사용자 리뷰</h2>
        </div>

        <section className="intro_end">
          <div className="intro_end_desc">
            <p>지구토리는 <br />
            총 <span>{totalCnt.totalClicks}</span> 개의 일회용 컵 사용을 줄였고, <br />
            총 <span>{totalCnt.totalCarbon}</span> g의 탄소배출을 저감했습니다.
            </p>

            <button onClick={() => history.push('/login')}>로그인 / 회원가입</button>
            <button onClick={() => history.push('/main')}>텀블러 혜택 카페 찾아보기</button>
            <button onClick={() => history.push('/store')}>텀블러 구매하기</button>

          </div>
        </section>
        <ScrollButton />

      </section>
    </>
  );
}

export default withRouter(Intro);
