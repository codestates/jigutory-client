import React from 'react';
import { ScrollButton } from '../components/ScrollButton';
import EarthSpinner from '../components/EarthSpinner';
import DotSpinner from '../components/DotSpinner';

function Intro() {
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
        <ScrollButton />
      </section>
    </>
  );
}

export default Intro;
