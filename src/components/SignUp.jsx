import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// import Login from './Login';
import axios from 'axios';
import '../styles/AuthModal.scss';
axios.defaults.withCredentials = true;

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let windowHandler = (e) => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", windowHandler);
    return () => {
      document.removeEventListener("mousedown", windowHandler);
    };
  });

  return domNode;
}

function SignUp({ accessToken, openModal, closeModal, handleUserInfo }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUpRequest();
    }
  };

  const validateUsername = (username) => {
    const regUsernaae = /^[0-9a-z]+$/;

    if (!regUsernaae.test(username)) {
      setUsernameError('유제네임 영문(소문자)/숫자만 허용');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  };

  const validateEmail = (email) => {
    const regEmail = /^[0-9a-z-_.]+@[0-9a-z]+\.[0-9a-z]+$/;

    if (!regEmail.test(email)) {
      setEmailError('이메일 영문(소문자)/숫자/특수문자(-_.)만 허용');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password, passwordCheck) => {
    if (password !== passwordCheck) {
      setPasswordError('동일한 비밀번호를 입력해 주세요.');
      return false;
    }

    const min = 5;
    const max = 20;
    const regPassword = /^[0-9a-z-_.!?*]+$/;

    // 비밀번호 길이 확인
    if (password.length < min) {
      setPasswordError('비밀번호는 5자 이상입니다.');
      return false;
    } else if (password.length > max) {
      setPasswordError('비밀번호는 20자 이하입니다.');
      return false;
    }

    // 비밀번호 정규식 확인
    if (!regPassword.test(password)) {
      setPasswordError('영문/숫자/특수문자(-_.!?*)만 허용');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSignUpRequest = () => {
    const validUsername = validateUsername(username);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password, passwordCheck);

    if (validUsername & validEmail && validPassword) {
      axios
        .post(
          'http://localhost:4000/auth/signup',
          { username: username, email: email, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: accessToken,
            },
          },
        )
        .then((res) => {
          console.log('signup res.data :', res.data);
          handleUserInfo({
            usename: res.data.username,
            email: res.data.email,
          })
          history.push('/intro');
        })
        .catch((err) => {
          console.log(err);
          // setEmailError('이미 존재하는 이메일입니다.');
        });
    }
  };

  let domNode = useClickOutside(() => {
    closeModal();
  })

  return (
    <div className="modal-container show-modal" onClick={openModal}>
      <div ref={domNode} className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
        <h2 className="modal-header">회원가입</h2>
        <div className="modal-info">
          <input
            autoFocus
            type="text"
            placeholder="이름"
            onChange={handleUsername}
            onKeyPress={onKeyPress}
            required
          />
          <input
            type="text"
            placeholder="이메일"
            onChange={handleEmail}
            onKeyPress={onKeyPress}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={handlePassword}
            onKeyPress={onKeyPress}
            required
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            onChange={handlePasswordCheck}
            onKeyPress={onKeyPress}
            required
          />
          <button className="signup-btn" onClick={handleSignUpRequest}>
            회원가입
          </button>
          {!usernameError ? (
            ''
          ) : (
              <div className="alert-box">
                <i className="fas fa-exclamation-circle"></i>
                {usernameError}
              </div>
            )}
          {!emailError ? (
            ''
          ) : (
              <div className="alert-box">
                <i className="fas fa-exclamation-circle"></i>
                {emailError}
              </div>
            )}
          {!passwordError ? (
            ''
          ) : (
              <div className="alert-box">
                <i className="fas fa-exclamation-circle"></i>
                {passwordError}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
