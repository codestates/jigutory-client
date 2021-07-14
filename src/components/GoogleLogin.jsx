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
    // const password = res.googleId;

    handleLogin(token);
    localStorage.setItem('accessToken', token);
    // localStorage.setItem('userinfo', JSON.stringify(userinfo))
    // handleUserInfo({
    //   username: username, email: email, imgUrl: profileImage
    // });

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/googlesignin`,
        {
          email: email,
          username: username,
          imgUrl: profileImage,
          // password: password,
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
        handleLogin(res.data.accessTokenGoogle);
        // handleLogin(res.data.data.createInfo.accessToken);
        handleUserInfo({
          // username: res.data.data.createInfo.username,
          // email: res.data.data.createInfo.email,
          username: res.data.googleInfo.username,
          email: res.data.googleInfo.email,
          imgUrl: res.data.googleInfo.profileImage,
        });
        localStorage.setItem('accessToken', res.data.accessTokenGoogle);
        // localStorage.setItem('accessToken', res.data.data.createInfo.accessToken);
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

// import React from 'react';
// import GoogleLogin from 'react-google-login';
// import googleLogo from '../images/google-logo.png';
// import '../styles/AuthModal.scss';
// import axios from 'axios';
// axios.defaults.withCredentials = true;

// const GoogleBtn = ({ handleLogin, handleUserInfo }) => {
//   const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

//   const responseGoogle = (res) => {
//     console.log('google res : ', res.dt);
//     console.log('google token : ', res.accessToken);

//     const token = res.accessToken;
//     handleLogin(token);
//     localStorage.setItem('Google-accessToken', res.accessToken);
//     axios
//       .post(
//         `${process.env.REACT_APP_API_URL}/auth/googlesignin`,
//         { email: res.dt.Nt, username: res.dt.uU },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             authorization: res.accessToken,
//           },
//         },
//       )
//       .then((res) => {
//         console.log(`thisisfirstgooglesigninres`, res);
//         handleLogin(res.data.accessTokenGoogle);
//         handleUserInfo({
//           username: res.data.googleInfo.username,
//           email: res.data.googleInfo.email,
//         });
//         localStorage.setItem('accessToken', res.data.accessTokenGoogle);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="google-login">
//       {
//         <GoogleLogin
//           clientId={GOOGLE_API}
//           responseType={'id_token'}
//           buttonText="Google 로그인"
//           onSuccess={responseGoogle}
//         // onFailure={responseGoogle}
//         />
//       }
//     </div>
//   );
// };

// export default GoogleBtn;
