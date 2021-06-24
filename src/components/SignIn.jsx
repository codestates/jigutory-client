// import { useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      loginhandler();
    }

    useEffect(() => {
      // 로그인 상태관리
    })

    function loginhandler() {
      if (!email || !password) {
        setMessage('이메일아니 비밀번호를 확인하세요.');
      }

      if (email && password) {
        axios.post('http://localhost:4000/signin',
          { email: email, password: password },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: accessToken,
            },

          })
      }
    }

  }
  return (
    <div>

    </div>
  );
}

export default SignIn;

// className 페이지명-container