import { useHistory } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react';
import '../styles/signin.scss'
import axios from 'axios';
axios.defaults.withCredentials = true;

// nav 컴포넌트에서 props 가져올 것
function SignIn({ accessToken, handleLogin, propstest }) {
  propstest();

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleEmail(e) {
    e.preventDefault();
    setEmail(e.target.value);
    // 이메일이 올바르지 않을 경우 alert
    if (e.target.value !== email) {
      setMessage('이메일을 확인해 주세요.')
    }
  }

  function handlePassword(e) {
    e.preventDefault();
    setPassword(e.target.value);
    // 비밀번호가 올바르지 않을 경우 alert
    if (e.target.value !== password) {
      setMessage('비밀번호를 확인해 주세요.')
    }
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      loginRequestHandler();
    }
  }

  function loginRequestHandler() {
    // email 혹은 password 빈 칸인 경우
    if (!email || !password) {
      setMessage('이메일이나 비밀번호를 확인하세요.');
    }

    // email 과 password 가 모두 입력된 경우
    if (email && password) {
      axios.post('http://localhost:4000/signin',
        { email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
          },
        }).then(res => {
          handleLogin(res.data.data.accessToken)
          return res;
        }).then(res => {
          console.log(res.data) // 응답 : accessToken, refreshToken, email 
          localStorage.setItem('accessToken', res.data.data.accessToken);
          localStorage.setItem('refreshToken', res.data.data.refreshToken);
          localStorage.setItem('email', res.data.data.email);
          setMessage('로그인에 성공하였습니다.')
        }).catch(err => console.log(err));
    }
  }

  useEffect(() => {
    // 로그인 상태관리 useEffect로
  })


  return (
    <div className="signin-modal_container">
      <div className="signin-modal">
        <button className="close"><i className="fas fa-times"></i></button>
        <h2>로그인</h2>
        <div className="signin-modal_contents">
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
            onChange={handleEmail}
            onKeyPress={onKeyPress}
            ref={passwordRef}
          />
          <button className="signin-google">구글 로그인</button>
          <button className="signin-kakao">카카오 로그인</button>
          <button className="signin-btn" onClick={loginRequestHandler}>로그인</button>
          <div>아직 지구토리의 회원이 아니라면<i class="fas fa-globe-asia"></i> <a href="#">회원가입</a></div>

        </div>
      </div>
    </div>
  );
}

export default SignIn;
