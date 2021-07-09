// import React, { useEffect } from 'react';
// import GoogleLogin from 'react-google-login';
// import googleLogo from '../images/google-logo.png';
// import '../styles/AuthModal.scss';
// import axios from 'axios';
// axios.defaults.withCredentials = true;

// // 토큰은 로컬스토리지에 저장하고, 유저정보만 서버로 넘기기
// // 서버에서 user table에 유저정보 저장

// const GoogleBtn = ({ handleLogin, handleUserInfo }) => {
//   const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

//   const responseGoogle = (res) => {
//     console.log('google res : ', res)

//     const token = res.accessToken;
//     const email = res.profileObj.email;
//     const username = res.profileObj.givenName;
//     const imgUrl = res.profileObj.imageUrl;

//     handleLogin(token);
//     handleUserInfo({ username, email, imgUrl });
//     localStorage.setItem('Google-accessToken', token);

//     axios
//       .post(
//         `http://localhost:4000/auth/googlesignin`,
//         { username, email, profileImage: imgUrl },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             authorization: token,
//           },
//         },
//       )
//       .then((res) => {
//         console.log('google axios res : ', res);
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="google-login" >
//       {
//         <GoogleLogin
//           clientId={GOOGLE_API}
//           render={(props) => (
//             <button
//               onClick={props.onClick}
//               className="modal-info google-btn social-btn"
//             >
//               <span>
//                 <img width="17" src={googleLogo} alt="google login" className="social-logo" />
//                 <span>구글 로그인</span>
//               </span>
//             </button>
//           )}
//           responseType={"id_token"}
//           onSuccess={responseGoogle}
//           onFailure={responseGoogle}
//         />
//       }
//     </div>
//   );
// };

// export default GoogleBtn;

import React, { useCallback } from 'react';
import GoogleLogin from 'react-google-login';
import googleLogo from '../images/google-logo.png';
import '../styles/AuthModal.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

const GoogleBtn = ({ handleLogin, handleUserInfo }) => {
  const GOOGLE_API = process.env.REACT_APP_GOOGLE_API;

  // const responseGoogle = useCallback(async (res) => {
  //   const token = res.accessToken;
  //   const email = res.profileObj.email;
  //   const username = res.profileObj.givenName;
  //   const profileImage = res.profileObj.imageUrl;
  //   const password = res.googleId;

  //   handleLogin(token);
  //   localStorage.setItem('Google-accessToken', token);

  //   await axios
  //     .post(
  //       `http://localhost:4000/auth/googlesignin`,
  //       { email: email, username: username, profileImage: profileImage, password: password },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           authorization: res.accessToken,
  //         },
  //       },
  //     )
  //     .then((res) => {
  //       console.log(`thisisfirstgooglesigninres`, res);
  //       handleLogin(res.data.accessTokenGoogle);
  //       handleUserInfo({
  //         username: res.data.googleInfo.username,
  //         email: res.data.googleInfo.email,
  //       });
  //       localStorage.setItem('accessToekn', res.data.accessTokenGoogle);
  //     })
  //     .catch((err) => console.log(err));

  // })
  const responseGoogle = async (res) => {
    console.log('google res : ', res);
    console.log('google token : ', res.accessToken);

    const token = res.accessToken;
    const email = res.profileObj.email;
    const username = res.profileObj.givenName;
    const profileImage = res.profileObj.imageUrl;
    const password = res.googleId;

    handleLogin(token);
    localStorage.setItem('Google-accessToken', token);

    await axios
      .post(
        `http://localhost:4000/auth/googlesignin`,
        { email: email, username: username, profileImage: profileImage, password: password },
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
        handleUserInfo({
          username: res.data.googleInfo.username,
          email: res.data.googleInfo.email,
        });
        localStorage.setItem('accessToekn', res.data.accessTokenGoogle);
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
                <img width="17" src={googleLogo} alt="google login" className="social-logo" />
                <span>구글 로그인</span>
              </span>
            </button>
          )}
          onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        />
      }
    </div>
  );
};

export default GoogleBtn;
