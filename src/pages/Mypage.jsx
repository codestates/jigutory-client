import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Mypage.scss';
// import { LevelInfo } from '../components/LevelInfo';
import { BadgeInfo } from '../components/BadgeInfo';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Mypage({ accessToken }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [clickNum, setClickNum] = useState(0);

  if (!profileImage) {
    setProfileImage(
      'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
    );
  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/userinfo', {
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setProfileImage(res.data.profileImage);
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

  return (
    <div className="mypage-container">
      <div className="mypage-container-top">
        <div className="mypage-userinfo">
          <div className="mypage-userinfo-left">
            <img src={profileImage} alt="프로필이미지"></img>
          </div>
          <div className="mypage-userinfo-right">
            <div className="mypage-userinfo-level">
              <div className="mypage-userinfo-title">레벨</div>
              <div className="mypage-userinfo-content"></div>
            </div>
            <div className="mypage-userinfo-name">
              <div className="mypage-userinfo-title">이름</div>
              <div className="mypage-userinfo-content">{username}</div>
            </div>
            <button
              className="mypage-userinfo-edit"
              onClick={() => {
                history.push('/edituser');
              }}
            >
              회원정보 수정
            </button>
          </div>
        </div>
        <div className="mypage-eco">
          <button className="mypage-eco-me">나의 환경 지킨 횟수</button>
          <div className="mypage-eco-total">전체 환경 지킨 횟수</div>
          <div className="mypage-eco-carbon">나의 탄소 저감량</div>
        </div>
      </div>
      <div className="mypage-container-bottom">
        <div className="mypage-badge">
          <div className="mypage-badge-title">
            <div>내 뱃지 리스트</div>
          </div>
          <div className="mypage-badge-list">
            <BadgeInfo />
            <div>뱃지1</div>
            <div>뱃지2</div>
            <div>뱃지3</div>
            <div>뱃지4</div>
            <div>뱃지5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
