import React from 'react';
import { useHistory, withRouter } from "react-router-dom";

function Intro() {
  const history = useHistory();
  const moveToIntro = () => {
    history.push('/intro');
  };

  return (
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
    </section>
  );
}

export default withRouter(Intro);
