import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';
import axios from 'axios';
import '../styles/AuthModal.scss';
axios.defaults.withCredentials = true;

function SignUp({
  accessToken,
  handleOpenSignUp,
  handleCloseSignUp,
  handleUserInfo,
}) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

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
    const min = 3;
    const regUsername = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9a-z]+$/;

    // 이름 길이 확인
    if (username.length < min) {
      setUsernameError('3자 이상 입력');
      return false;
    }

    // 이름 정규식 확인
    if (!regUsername.test(username)) {
      setUsernameError('한글 / 영문 소문자 / 숫자만 허용');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  };

  const validateEmail = (email) => {
    const regEmail = /^[0-9a-z-_.]+@[0-9a-z]+\.[0-9a-z]+$/;

    if (email.length === 0) {
      setEmailError('1자 이상 입력');
    } else if (!regEmail.test(email)) {
      setEmailError('영문 소문자 / 숫자 / 특수문자(-_.)만 허용');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password, passwordCheck) => {
    if (passwordCheck.length === 0) {
      setPasswordCheckError('동일한 비밀번호를 입력해 주세요');
    } else if (password !== passwordCheck) {
      setPasswordCheckError('동일한 비밀번호를 입력해 주세요');
      return false;
    }

    const min = 8;
    const max = 20;
    const regPassword = /^[0-9a-z-_.!?*]+$/;

    // 비밀번호 길이 확인
    if (password.length < min || password.length > max) {
      setPasswordError('8~20자 입력');
      return false;
    }

    // 비밀번호 정규식 확인
    if (!regPassword.test(password)) {
      setPasswordError('영문 소문자 / 숫자 / 특수문자(-_.!?*)만 허용');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSignUpRequest = async () => {
    const validUsername = validateUsername(username);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password, passwordCheck);

    if (validUsername & validEmail && validPassword) {
      await axios
        .post(
          process.env.REACT_APP_API_URL+`/auth/signup`,
          { username: username, email: email, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: accessToken,
            },
          },
        )
        .then((res) => {
          // handleUserInfo({
          //   usename: res.data.username,
          //   email: res.data.email,
          // });
          setIsSignUp(true);
          setTimeout(() => {
            history.push('/intro');
            handleCloseSignUp();
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setIsSignUp(false);
          setEmailError('이메일이 중복됩니다.');
        });
    }
  };

  const domNode = useClickOutside(() => {
    handleCloseSignUp();
  });

  return (
    <div className="modal-container show-modal" onClick={handleOpenSignUp}>
      {isSignUp ? (
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-success">회원가입에 성공했습니다!</h2>
        </div>
      ) : (
        <div
          ref={domNode}
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={handleCloseSignUp}>
            <i className="fas fa-times fa-lg"></i>
          </button>
          <h2 className="modal-header">회원가입</h2>
          <div className="modal-info">
            <div className="modal-info-title">이름</div>
            <input
              autoFocus
              type="text"
              placeholder="한글 / 영문 소문자 / 숫자만 허용"
              onChange={handleUsername}
              onKeyPress={onKeyPress}
              required
            />
            {!usernameError ? (
              ''
            ) : (
              <div className="modal-alert-box">
                <i className="fas fa-times"></i>
                &nbsp;{usernameError}
              </div>
            )}
            <div className="modal-info-title">이메일</div>
            <input
              type="text"
              placeholder="영문 소문자 / 숫자 / 특수문자(-_.)만 허용"
              onChange={handleEmail}
              onKeyPress={onKeyPress}
              required
            />
            {!emailError ? (
              ''
            ) : (
              <div className="modal-alert-box">
                <i className="fas fa-times"></i>
                &nbsp;{emailError}
              </div>
            )}
            <div className="modal-info-title">비밀번호</div>
            <input
              type="password"
              placeholder="영문 소문자 / 숫자 / 특수문자(-_.!?*)만 허용"
              onChange={handlePassword}
              onKeyPress={onKeyPress}
              required
            />
            {!passwordError ? (
              ''
            ) : (
              <div className="modal-alert-box">
                <i className="fas fa-times"></i>
                &nbsp;{passwordError}
              </div>
            )}
            <div className="modal-info-title">비밀번호 확인</div>
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={handlePasswordCheck}
              onKeyPress={onKeyPress}
              required
            />
            {!passwordCheckError ? (
              ''
            ) : (
              <div className="modal-alert-box">
                <i className="fas fa-times"></i>
                &nbsp;{passwordError}
              </div>
            )}
            <button className="signup-btn" onClick={handleSignUpRequest}>
              회원가입
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
