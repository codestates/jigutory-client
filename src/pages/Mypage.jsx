import React from 'react';
import { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import EditUser from './EditUser';

import '../styles/Mypage.scss';

const Mypage = (accessToken, userInfo, level, badge) => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');


  return (
    <div className="mypage-container">
      <div>My page</div>
      <button onClick={() => { history.push('/edituser') }}>유저정보 수정</button>

    </div>
  )
}

export default withRouter(Mypage);
