import React, { useEffect, useState, useRef } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import KaKaoLogin from './KakaoLogIn';
import axios from 'axios';
import '../styles/AuthModal.scss';
axios.defaults.withCredentials = true;

// nav 컴포넌트에서 props 가져올 것
const Login = ({ handleLogin, accessToken, openModal, closeModal, handleUserInfo }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    if (e.target.value !== email) {
      setErrorMessage('이메일을 확인해 주세요.');
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    if (e.target.value !== password) {
      setErrorMessage('비밀번호를 확인해 주세요.');
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLoginRequest();
    }
  };


  const handleLoginRequest = (e) => {
    console.log('로그인 리퀘스트')
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
      axios.post('http://localhost:4000/auth/login',
        { email: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: accessToken,
          }
        })
        .then((res) => {
          handleLogin(res.data.data.accessToken);
          // handleUserInfo({})
          return res;
        })
        .then((res) => {
          console.log('res.data :', res.data);
          localStorage.setItem('accessToken', res.data.data.accessToken);
          setSuccessMessage('로그인에 성공하였습니다.');
          history.push('/intro');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div div className="modal-container show-modal" onClick={openModal} >
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
          <button className="login-btn" onClick={handleLoginRequest}>로그인</button>
          <div className="social-container">
            <GoogleLogin handleLogin={handleLogin} handleUserInfo={handleUserInfo} />
            <KaKaoLogin handleLogin={handleLogin} handleUserInfo={handleUserInfo} />
          </div>
          {!errorMessage ? ('') : <div className="alert-box"><i className="fas fa-exclamation-circle"></i>{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);



// const clickSignUp = () => {
//   history.push('/signup')
//   console.log('회원가입으로 이동')
// }

{/* <div>
  아직 지구토리의 회원이 아니라면<i class="fas fa-globe-asia"></i>
  <button onClick={clickSignUp}>회원가입</button>
</div> */}