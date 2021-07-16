import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { ScrollButton } from '../components/ScrollButton';
import axios from 'axios';
import IntroEnding from '../components/IntroEnding';
import IntroMypage from '../components/IntroMypage';
import IntroStore from '../components/IntroStore';

function Intro() {

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
        <IntroStore />
        <IntroEnding />
        <ScrollButton />

      </main>
    </>
  );
}

export default withRouter(Intro);
