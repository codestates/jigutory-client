import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import '../styles/Login.scss';
axios.defaults.withCredentials = true;

// nav 컴포넌트에서 props 가져올 것
function Login({ handleLogin, accessToken, openModal, closeModal }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (e.target.value !== email) {
      // 이메일이 올바르지 않을 경우 alert
      setErrorMessage('이메일을 확인해 주세요.');
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    // 비밀번호가 올바르지 않을 경우 alert
    if (e.target.value !== password) {
      setErrorMessage('비밀번호를 확인해 주세요.');
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLoginRequest = (e) => {
    // email 혹은 password 빈 칸인 경우
    if (!email) {
      setErrorMessage('이메일을 입력하세요.');
    } else if (!password) {
      setErrorMessage('비밀번호를 입력하세요.');
    } else if (!email && !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요.');
    }
    // email 과 password 가 모두 입력된 경우
    if (email && password) {
      axios
        .post(
          'http://localhost:4000/auth/login',
          { email: email, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: accessToken,
              withCredentials: true,
            },
          },
        )
        .then((res) => {
          handleLogin(res.data.data.accessToken);
          return res;
        })
        .then((res) => {
          console.log('res.data :', res.data);
          localStorage.setItem('accessToken', res.data.data.accessToken);
          localStorage.setItem('refreshToken', res.data.data.refreshToken);
          localStorage.setItem('email', res.data.data.email);
          setErrorMessage('로그인에 성공하였습니다.');
          history.push('/intro');
        })
        .catch((err) => console.log(err));
    }
  };

  // function responseGoogle(response) {
  //   console.log(response);
  //   console.log(response.profile);
  // }

  return (
    <div className="modal-container show-modal" onClick={openModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
        <h2 className="modal-header">로그인</h2>
        <div className="modal-info">
          <input
            autoFocus
            type="email"
            placeholder="이메일"
            onChange={handleEmail}
            onKeyPress={onKeyPress}
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={handlePassword}
            onKeyPress={onKeyPress}
            ref={passwordRef}
          />
          <GoogleLogin
            clientId="925382932502-goj9fkkkr5nf6n4632vi0oo1nj4tbjmq.apps.googleusercontent.com"
            buttonText="Login"
            // onSuccess={responseGoole}
            // onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <button className="googlelogin-btn">구글 로그인</button>
          <button className="kakaologin-btn">카카오 로그인</button>
          <button className="login-btn" onClick={handleLoginRequest}>
            로그인
          </button>
          <div>
            아직 지구토리의 회원이 아니라면<i class="fas fa-globe-asia"></i>{' '}
            <a href="#">회원가입</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
