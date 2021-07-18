import React from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../images/google-logo.png';
import '../styles/AuthModal.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

const GoogleBtn = ({ handleLogin, handleUserInfo }) => {
  const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

  const responseGoogle = async (res) => {
    console.log('google res : ', res);
    console.log('google token : ', res.accessToken);

    const token = res.accessToken;
    const email = res.profileObj.email;
    const username = res.profileObj.givenName;
    const profileImage = res.profileObj.imageUrl;

    handleLogin(token);
    localStorage.setItem('accessToken', token);
    handleUserInfo({
      username: username,
      email: email,
      imgUrl: profileImage,
    });

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/googlesignin`,
        {
          email: email,
          username: username,
          profileImage: profileImage,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: res.accessToken,
          },
        },
      )
      .then((res) => {
        console.log(`thisisfirstgooglesigninres`, res);
        handleLogin(res.data.accessToken);
        handleUserInfo({
          username: res.data.googleInfo.username,
          email: res.data.googleInfo.email,
        });
        localStorage.setItem('accessToken', res.data.accessToken);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="google-login">
      {
        <GoogleLogin
          clientId={GOOGLE_API}
          responseType={'id_token'}
          render={(props) => (
            <button
              onClick={props.onClick}
              className="modal-info google-btn social-btn"
            >
              <span>
                <img
                  width="17"
                  src={googleLogo}
                  alt="google login"
                  className="social-logo"
                />
                <span>구글 로그인</span>
              </span>
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      }
    </div>
  );
};

export default GoogleBtn;
