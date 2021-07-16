import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { ScrollButton } from '../components/ScrollButton';
import axios from 'axios';
import IntroEnding from '../components/IntroEnding';
import IntroMypage from '../components/IntroMypage';

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
      <main className="intro-container">
        {/* 
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
        </div> */}


        <IntroMypage />
        <IntroEnding />
        <ScrollButton />

      </main>
    </>
  );
}

export default withRouter(Intro);
