import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../image/google-logo.png';
import googleBtnImg from '../image/btn-google.png';
import '../styles/AuthModal.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

// 토큰은 로컬스토리지에 저장하고, 유저정보만 서버로 넘기기
// 서버에서 user table에 유저정보 저장
// 
const GoogleBtn = ({ handleLogin, handleUserInfo }) => {
  const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

  const responseGoogle = (res) => {
    console.log('google res : ', res);
    console.log('google token : ', res.accessToken);
    // console.log('google profileObj : ', res.profileObj.givenName);

    const token = res.accessToken;
    //const email = res.profileObj.email;
    //const username = res.profileObj.givenName;
    handleLogin(token);
    localStorage.setItem('Google-accessToken', token);
    //localStorage.setItem('usename', username);
    //localStorage.setItem('email', email);
    // handleUserInfo({ username: username, email: email });

    axios
      .post(
        'https://localhost:4000/auth/googlesignin',
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true
          },
        },
      )
      .then((res) => {
        console.log('google axios res : ', res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="google-login" onClick={responseGoogle}>
      {
        <GoogleLogin
          clientId={GOOGLE_API}
          render={(props) => (
            <button
              onClick={props.onClick}
              className="modal-info google-btn social-btn"
            >
              <span>
                <img width="17" src={googleLogo} className="social-logo" />
                <span>구글 로그인</span>
              </span>
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      }
      {/* <img width="150px" src={googleBtnImg} alt="google-button" className="login-btn" /> */}
    </div>
  );
};

export default GoogleBtn;
