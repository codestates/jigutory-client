import React from 'react';
import logo from '../image/jigu-logo.png';
import { useHistory, withRouter } from 'react-router-dom';

function Intro() {
  const history = useHistory();
  const moveToIntro = () => {
    history.push('/intro');
  };

  return (
    <div className="intro-container">
      <div className="intro-overall">
        {/* <a href="#">
          <img
            className="logo"
            src={logo}
            onClick={moveToIntro}
            alt="logo"
            width="50px"
          />
        </a> */}
        <h2>지구토리 인트로 페이지</h2>
      </div>
    </div>
  );
}

export default withRouter(Intro);
