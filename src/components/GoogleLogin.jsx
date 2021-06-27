import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../image/google-logo.png';
import googleBtnImg from '../image/btn-google.png';
import '../styles/AuthModal.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

const GoogleBtn = ({ handleLogin, handleUserInfo }) => {
  const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

  const responseGoogle = (res) => {
    console.log('google res : ', res);
    console.log('google token : ', res.accessToken);

    const token = res.accessToken;
    handleLogin(token);
    localStorage.setItem('Google-accessToken', token);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/googlelogin`,
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log('google axios res : ', res);
        handleUserInfo({
          username: res.profileObj.givenName,
          email: res.profileObj.email,
          imgUrl: res.profileObj.imageUrl,
        });
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
