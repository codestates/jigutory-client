import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import axios from 'axios';
import logo from '../images/jigu-logo.png';
import '../styles/Nav.scss';
axios.defaults.withCredentials = true;

function Nav({
  isLogin,
  handleLogout,
  handleLogin,
  handleUserInfo,
  accessToken,
}) {
  const history = useHistory();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
    console.log('로그인 모달창 열기');
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    console.log('로그인 모달창 닫기');
  };

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
    console.log('회원가입 모달창 열기');
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
    console.log('회원가입 모달창 닫기');
  };

  // 버튼 클릭 시 각 페이지 이동
  const clickIntroPage = () => {
    history.push('/intro');
    console.log('인트로 페이지로 이동');
  };

  const clickMainPage = () => {
    history.push('/main');
    console.log('메인 페이지로 이동');
  };

  const clickStorePage = () => {
    history.push('/store');
    console.log('상점 페이지로 이동');
  };

  const clickMyPage = () => {
    history.push('/mypage');
    console.log('마이 페이지로 이동');
  };

  return (
    <div className="nav">
      {isLogin ? (
        <>
          <a href="#">
            <img
              className="nav-logo"
              onClick={clickIntroPage}
              alt="지구토리 로고"
              src={logo}
              width="50px"
            />
            {/* <div className="nav-title">지구토리</div> */}
          </a>

          <div className="buttons">
            <a href="#">
              <button className="nav-main nav-btn" onClick={clickMainPage}>
                지도
              </button>
            </a>
            <a href="#">
              <button className="nav-store nav-btn" onClick={clickStorePage}>
                상점
              </button>
            </a>
            <a href="#">
              <button className="nav-mypage nav-btn" onClick={clickMyPage}>
                마이 페이지
              </button>
            </a>
            <a href="/">
              <button
                className="nav-logout nav-btn hide"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </a>
          </div>
        </>
      ) : (
        <>
          <a href="#">
            <img
              className="nav-logo"
              onClick={clickIntroPage}
              src={logo}
              alt="logo"
            />
            {/* <div className="nav-title">지구토리</div> */}
          </a>
          <div className="buttons">
            <a href="#">
              <button className="nav-main nav-btn" onClick={clickMainPage}>
                지도
              </button>
            </a>
            <a href="#">
              <button className="nav-store nav-btn" onClick={clickStorePage}>
                상점
              </button>
            </a>
            <button className="nav-login nav-btn" onClick={handleOpenLogin}>
              로그인
            </button>
            {isLoginOpen && (
              <Login
                isLoginOpen={isLoginOpen}
                handleOpenLogin={handleOpenLogin}
                handleCloseLogin={handleCloseLogin}
                handleUserInfo={handleUserInfo}
                handleLogin={handleLogin}
                handleOpenSignup={handleOpenSignUp}
                accessToken={accessToken}
              />
            )}

            {isSignUpOpen && (
              <SignUp
                isSignUpOpen={isSignUpOpen}
                handleOpenSignUp={handleOpenSignUp}
                handleCloseSignUp={handleCloseSignUp}
                handleUserInfo={handleUserInfo}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(Nav);
