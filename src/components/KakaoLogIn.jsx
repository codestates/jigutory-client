import React, { useEffect, useState } from 'react';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
import kakaoLogo from '../images/kakao-logo.png';
import '../styles/AuthModal.scss';
axios.defaults.withCredentials = true;

const KakaoBtn = ({ handleLogin, handleUserInfo }) => {
  const [loginResult, setLoginResult] = useState(false);

  const KAKAO_API = process.env.REACT_APP_KAKAO_API;

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(KAKAO_API);
    console.log(window.Kakao.isInitialized());
  }

  const responseKakao = (res) => {
    console.log('kakao res :', res);
    handleUserInfo({
      username: res.profile.kakao_account.profile.nickname,
      email: res.accessToken, // 아직 모름
      imageUrl: res.profile.kakao_account.profile.profile_image_url,
    });

    const token = res.response.access_token; // should be updated after checking real response from kakao
    axios
      .post(
        'https://localhost:4000/auth/kakaosignin',
        { token },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then((res) => {
        localStorage.setItem('Kakao-accessToken', token);
        handleLogin(token);
      })
      .catch((res) => console.log(res));
  };

  return (
    <div className="kakao-login">
      {
        <KaKaoLogin
          jsKey={KAKAO_API}
          render={(props) => (
            <button
              onClick={props.onClick}
              className="modal-info kakao-btn social-btn"
            >
              <span>
                <img width="22px" src={kakaoLogo} className="social-logo" />
                <span>카카오 로그인</span>
              </span>
            </button>
          )}
          onSuccess={responseKakao}
          onFailure={() => console.log('카카오 로그인 실패')}
          getProfile={true}
        />
      }
    </div>
  );
};

export default KakaoBtn;

/*
1. 권한 접근
Kakao.init()

2. 토큰 발급
Kakao.Auth

3. 토큰을 이용한 정보수집
Kakao.API.request()
*/
