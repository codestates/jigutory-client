import React from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../images/google-logo.png';
import '../styles/AuthModal.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

// 토큰은 로컬스토리지에 저장하고, 유저정보만 서버로 넘기기
// 서버에서 user table에 유저정보 저장
// 
const GoogleBtn = ({ handleLogin, handleUserInfo }) => {
  const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

  const responseGoogle = (res) => {
    // console.log('google res : ', res.dt);
    // console.log('google token : ', res.accessToken);
    //console.log('google profileObj : ', res.profileObj.givenName);

    const token = res.accessToken;
    //const email = res.profileObj.email; // 로그인 처리 완료 된 후에야 응답 들어와서 여기서 쓰면 정보 없어서 에러뜸
    //const username = res.profileObj.givenName;
    handleLogin(token);
    localStorage.setItem('Google-accessToken', res.accessToken);
    //localStorage.setItem('usename', username);
    //localStorage.setItem('email', email);
    //handleUserInfo({ username: username, email: email });
    axios
      .post(
        `http://localhost:4000/auth/googlesignup`,
        { email: res.dt.Nt, username: res.dt.uU },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: res.accessToken,
          },
        },
      )
      .then((res) => {
        console.log('google axios res : ', res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="google-login" >
      {
        <GoogleLogin
          clientId={GOOGLE_API}
          responseType={"id_token"}
          buttonText="Google 회원가입"
          onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        />
      }
    </div>
  );
};

export default GoogleBtn;