import React from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../images/google-logo.png';
import '../styles/AuthModal.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

const GoogleBtn = ({ handleLogin }) => {
  const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

  const responseGoogle = (res) => {
    const token = res.accessToken;

    handleLogin(token);
    localStorage.setItem('Google-accessToken', res.accessToken);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/googlesignup`,
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
    <div className="google-login">
      {
        <GoogleLogin
          clientId={GOOGLE_API}
          responseType={'id_token'}
          buttonText="Google 회원가입"
          onSuccess={responseGoogle}
          // onFailure={responseGoogle}
        />
      }
    </div>
  );
};

export default GoogleBtn;
