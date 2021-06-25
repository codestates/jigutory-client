import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

function SignUp() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false);

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
      handleSignUp();
    }
  };

  const validateEmail = (email) => {
    const reg = /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*.[a-z]$/i;

    const isValid = reg.test(email);
    if (!isValid) {
      setErrorMessage('이메일에는 x, y, z가 들어가야 합니다.');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const validatePassword = (password, passwordCheck) => {
    if (password !== passwordCheck) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return false;
    }
    const min = 5;
    const max = 20;
    const reg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // 비밀번호 길이 확인
    if (password.length < min) {
      setErrorMessage('비밀번호는 5자 이상입니다.');
      return false;
    } else if (password.length > max) {
      setErrorMessage('비밀번호는 20자 이하입니다.');
      return false;
    }

    // 비밀번호 정규식 확인
    if (!reg.test(password)) {
      setErrorMessage('어쩌구저쩌구');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleSignUpRequest = () => {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (!validEmail) {
      setErrorMessage('이메일을 입력하세요.');
    } else if (validEmail && validPassword) {
      axios
        .post(
          'http://localhost:4000/auth/signup',
          { username: username, email: email, password: password },
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: accessToken,
              withCredentials: true,
            },
          },
        )
        .then((res) => {
          console.log('res.data :', res.data);
          history.push('/intro');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="modal-container show-modal" onClick={openModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="close">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="modal-header">회원가입</h2>
        <div className="modal-info">
          <input
            autoFocus
            type="text"
            className="modal-input"
            placeholder="이름"
            onChange={handleUsername}
            onKeyPress={onKeyPress}
            required
          />
          <input
            type="email"
            className="modal-input"
            placeholder="이메일"
            onChange={handleEmail}
            onKeyPress={onKeyPress}
            required
          />
          <input
            type="password"
            className="modal-input"
            placeholder="비밀번호"
            onChange={handlePassword}
            onKeyPress={onKeyPress}
            required
          />
          <input
            type="password"
            className="modal-input"
            placeholder="비밀번호 확인"
            onChange={handlePasswordCheck}
            onKeyPress={onKeyPress}
            required
          />
          <button className="signup-btn btn" onClick={handleSignUpRequest}>
            회원가입
          </button>
          {isSignup && <Signin />}
          {!errorMessage ? (
            ''
          ) : (
            <div className="alert-box">
              <i className="fas fa-exclamation-circle"></i>
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
