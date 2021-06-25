import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import axios from 'axios';
import '../styles/Nav.scss';
import { withRouter, useHistory } from 'react-router-dom';
import logo from '../image/jigu-logo.png';
axios.defaults.withCredentials = true;

function Nav({ isLogin, handleLogout, handleSignInRequest }) {
  const history = useHistory();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleOpenSignIn = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    console.log('로그인 모달창 열기');
  };

  const handleCloseSignIn = () => {
    setIsSignInOpen(false);
    console.log('로그인 모달창 닫기');
  };

  const handleOpenSignUp = () => {
    setIsSignUpOpen(false);
    setIsSignUpOpen(true);
    console.log('회원가입 모달창 열기');
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
    console.log('회원가입 모달창 닫기');
  };

  const clickIntroPage = () => {
    // 로고 클릭
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
            <img className="nav-logo" onClick={clickIntroPage} alt="logo" />
          </a>

          <div className="buttons">
            <a href="#">
              <button className="nav-post nav-btn" onClick={clickMainPage}>
                {' '}
                메인 페이지{' '}
              </button>
            </a>
            <a href="#">
              <button className="nav-post nav-btn" onClick={clickStorePage}>
                {' '}
                상점 페이지{' '}
              </button>
            </a>
            <a href="/">
              <button className="nav-logout nav-btn hide">로그아웃</button>
            </a>
            <a href="#">
              <button className="nav-mypage nav-btn hide" onClick={clickMyPage}>
                {' '}
                마이 페이지{' '}
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
            </a>
            <div className="buttons">
              <button className="nav-signin nav-btn" onClick={handleOpenSignIn}>
                로그인
            </button>
              {isSignInOpen && (
                <SignIn
                  openModal={handleOpenSignIn}
                  closeModal={handleCloseSignIn}
                  handleLogin={handleSignInRequest}
                  handleOpenSignup={handleOpenSignUp}
                />
              )}

              <button className="nav-signup nav-btn" onClick={handleOpenSignUp}>
                회원가입
            </button>
              {isSignUpOpen && (
                <SignUp
                  openModal={handleOpenSignUp}
                  closeModal={handleCloseSignUp}
                  handleOpenSignin={handleOpenSignIn}
                  handleOpenSignup={handleOpenSignUp}
                />
              )}
            </div>
          </>
        )}
    </div>
  );
}

export default withRouter(Nav);
