import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import axios from 'axios';
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
    <nav id="nav">
      {isLogin ? (
        <>
          <section className="nav_buttons_moblie">

            <a href="#!">
              <button className="nav-btn-mobile" onClick={clickIntroPage}>
                <img src="https://img.icons8.com/ios/50/000000/home.png" width="25px" />
              </button>
            </a>

            <a href="#!">
              <button className="nav-btn-mobile" onClick={clickMainPage}>
                <img src="https://img.icons8.com/ios/50/000000/map-marker--v1.png" width="25px" />
              </button>
            </a>
            <a href="#!">
              <button className="nav-btn-mobile" onClick={clickStorePage}>
                <img src="https://img.icons8.com/ios/50/000000/grocery-store.png" width="25px" />
              </button>
            </a>
            <a href="#!">
              <button className="nav-btn-mobile" onClick={clickMyPage}>
                <img src="https://img.icons8.com/ios/50/000000/police-badge.png" width="25px" />

              </button>
            </a>
            <a href="/">
              <button className="nav-btn-mobile" onClick={handleLogout}>
                <img src="https://img.icons8.com/ios/50/000000/logout-rounded-down.png" width="25px" />
              </button>
            </a>


          </section>
        </>
      ) : (
          <>
            <section className="nav_buttons_moblie">

              <a href="#!">
                <button className="nav-btn-mobile" onClick={clickIntroPage}>
                  <img src="https://img.icons8.com/ios/50/000000/home.png" width="25px" />
                </button>
              </a>
              <a href="#!">
                <button className="nav-btn-mobile" onClick={clickMainPage}>
                  <img src="https://img.icons8.com/ios/50/000000/map-marker--v1.png" width="25px" />

                </button>
              </a>
              <a href="#!">
                <button className="nav-btn-mobile" onClick={clickStorePage}>
                  <img src="https://img.icons8.com/ios/50/000000/grocery-store.png" width="25px" />

                </button>
              </a>
              <a href="#!">
                <button className="nav-btn-mobile" onClick={handleOpenLogin}>
                  <img src="https://img.icons8.com/ios/50/000000/police-badge.png" width="25px" />
                </button>
              </a>
              <button className="nav-btn-mobile" onClick={handleOpenLogin}>
                <img src="https://img.icons8.com/ios/50/000000/login-rounded-right--v1.png" width="25px" />
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
                  isLogin={isLogin}
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

            </section>
          </>
        )}
    </nav>
  );
}

export default withRouter(Nav);


