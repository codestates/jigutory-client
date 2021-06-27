import React, { useState } from 'react';
import KaKaoLogin from 'react-kakao-login';
import axios from 'axios';
import kakaoLogo from '../image/kakao-logo.png';
import '../styles/AuthModal.scss';
axios.defaults.withCredentials = true;

const KakaoBtn = ({ handleLogin, handleUserInfo }) => {
  const KAKAO_API = process.env.REACT_APP_KAKAO_API;

  const responseKakao = (res) => {
    console.log('kakao res :', res);
    console.log('kakao token : ', res.accessToken);

    const token = res.accessToken; // should be updated after checking real response from kakao
    axios.post('http://localhost:4000/auth/kakaosignin',
      { token },
      {
        headers: {
          Authorization: res.response.access_token,
        }
      })
      .then((res) => {
        console.log('kakao axios res : ', res);
        localStorage.setItem('Kakao-accessToken', token)
        handleLogin(token); // 응답받으면 액세스 토큰 상태에 저장하고
        // 응답 콘솔 확인 후 수정할 것
        // 응답 받은 유저정보 상태에 저장? 프론트에서 api 로 받은 유저정보를 백에 토큰만 넘겨주는데 유저정보를 어떻게 받아옴? 넘겨주기 전에 저장해야되나
        handleUserInfo({
          username: res.accessToken,
          email: res.accessToken,
          imageUrl: res.accessToken,
        })
      })
      .catch(res => console.log(res))
  }

  return (
    <div className="kakao-login">
      {<KaKaoLogin
        jsKey={KAKAO_API}
        render={props => (<button onClick={props.onClick} className="modal-info kakao-btn social-btn" >
          <span><img width="20px" src={kakaoLogo} className="social-logo" />카카오 로그인</span></button>)}
        onSuccess={responseKakao}
        onFailure={() => console.log('카카오 로그인 실패')}
        getProfile={true}
      />}
    </div>);
}

export default KakaoBtn;
