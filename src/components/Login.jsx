import React, { useState, useRef } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
// import GoogleSignup from './GoogleSignup'
import useClickOutside from '../hooks/useClickOutside';
import axios from 'axios';
import '../styles/AuthModal.scss';
axios.defaults.withCredentials = true;

function Login({
  handleLogin,
  accessToken,
  handleOpenLogin,
  handleCloseLogin,
  handleUserInfo,
  handleOpenSignup,
  isLoginOpen,
}) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //const [successMessage, setSuccessMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLoginRequest();
    }
  };

  const handleLoginRequest = async (e) => {
    console.log('로그인 리퀘스트');
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
      await axios
        .post(
          'http://localhost:4000/auth/signin',
          { email: email, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: accessToken,
            },
          },
        )
        .then((res) => {
          handleLogin(res.data.data.accessToken);
          axios
            .get('http://localhost:4000/user/userinfo', {
              headers: {
                'Content-Type': 'application/json',
                authorization: res.data.data.accessToken,
              },
            })
            .then((res) => {
              handleUserInfo(res.data);
              handleUserInfo({
                username: res.data.username,
                email: res.data.email,
              });
            });
          return res;
        })
        .then((res) => {
          console.log('res.data :', res.data);
          localStorage.setItem('accessToken', res.data.data.accessToken);
          //setSuccessMessage('로그인에 성공하였습니다.');
          history.push('/intro');
        })
        .catch((err) => console.log(err));
    }
  };

  const moveToSignUp = () => {
    handleCloseLogin();
    handleOpenSignup();
  };

  let domNode = useClickOutside(() => {
    handleCloseLogin();
  });

  return (
    <div className="modal-container show-modal" onClick={handleOpenLogin}>
      <div ref={domNode} className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseLogin}>
          <i className="fas fa-times fa-lg"></i>
        </button>
        <h2 className="modal-header">로그인</h2>
        <div className="modal-info">
          <div className="modal-info-title">이메일</div>
          <input
            autoFocus
            type="email"
            placeholder="이메일"
            onChange={handleEmail}
            onKeyPress={onKeyPress}
            ref={emailRef}
          />

          <div className="modal-info-title">비밀번호</div>

          <input
            type="password"
            placeholder="비밀번호"
            onChange={handlePassword}
            onKeyPress={onKeyPress}
            ref={passwordRef}
          />
          {!errorMessage ? (
            ''
          ) : (
            <div className="modal-alert-box">
              <i className="fas fa-exclamation-circle"></i>
              {errorMessage}
            </div>
          )}
          <button className="login-btn" onClick={handleLoginRequest}>
            로그인
          </button>
          <div>
            <GoogleLogin
              handleLogin={handleLogin}
              handleUserInfo={handleUserInfo}
            />
          </div>

          <button className="move_signup-btn" onClick={moveToSignUp}>
            <i className="fas fa-user-plus"></i>
            <span>회원가입</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
