import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import badgeImg from '../images/mypage-badge.png';
import LevelInfo from '../components/LevelInfo';
// import useClickOutside from '../hooks/useClickOutside';
import '../styles/Mypage.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Mypage({ accessToken }) {
  const history = useHistory();
  const [isModalOn, setIsModalOn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [badgeList, setBadgeList] = useState([]);
  const [selectedBadgeId, setSelectedBadgeId] = useState();
  const [clickNum, setClickNum] = useState(0);
  const [carbonReduction, setCarbonReduction] = useState(0);
  const [levelInfo, setLevelInfo] = useState({
    name: '',
    image: '',
    description: '',
    level: '',
  });

  const handleOpenModal = () => {
    if (levelInfo) {
      setIsModalOn(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOn(false);
  };

  const handleCloseBadge = () => {
    setSelectedBadgeId();
  };

  const handleClickNum = () => {
    axios
      .post(
        'http://localhost:4000/level/read',
        { clickNum, email },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => {
        // console 삭제하면 에러뜨는데 이유 못찾음
        console.log('handleClickNum res :', res);
        if (res.data.getUpdateInfo) {
          setClickNum(res.data.getUpdateInfo.clickNum);
          setCarbonReduction(res.data.getUpdateInfo.carbonReduction);

          if (res.data.level) {
            setLevelInfo({
              name: res.data.level.name,
              image: res.data.level.image,
              description: res.data.level.description,
              level: res.data.level.id,
            });
          }
        } else {
          return false;
        }
      })
      .catch((res) => console.log(res));
  };

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
        setEmail(res.data.email);
        console.log('email :', res.data.email);
        axios
          .post(
            'http://localhost:4000/level/read',
            { clickNum: clickNum, email: res.data.email },
            {
              headers: {
                'Content-Type': 'application/json',
                //authorization: accessToken,
              },
            },
          )
          .then((res) => {
            console.log('level : ', res);
            setClickNum(res.data.clickNum);
            setCarbonReduction(res.data.carbonReduction);
          });
      })
      .catch((err) => console.log(err));

    axios
      .post('http://localhost:4000/badge/read', {
        headers: {
          'Content-Type': 'application/json',
          //authorization: accessToken,
        },
      })
      .then(({ data }) => {
        setBadgeList(data.badgeAll);
        console.log('badge: ', data.badgeAll);
      });
  }, [accessToken, setEmail, setClickNum]);

  console.log('email : ', email);
  console.log('clickNum :', clickNum);
  console.log('level :', levelInfo.level);

  useEffect(() => {
    const badgeOne = document.querySelector('.mypage-badge-image-one');
    const badgeTwo = document.querySelector('.mypage-badge-image-two');
    const badgeThree = document.querySelector('.mypage-badge-image-three');
    const badgeFour = document.querySelector('.mypage-badge-image-four');
    const badgeFive = document.querySelector('.mypage-badge-image-five');

    if (carbonReduction >= 500) {
      badgeOne.classList.remove('badgeHide');
    }
    if (carbonReduction >= 900) {
      badgeTwo.classList.remove('badgeHide');
    }
    if (carbonReduction >= 2000) {
      badgeThree.classList.remove('badgeHide');
    }
    if (carbonReduction >= 3500) {
      badgeFour.classList.remove('badgeHide');
    }
    if (carbonReduction >= 5000) {
      badgeFive.classList.remove('badgeHide');
    }
  }, [carbonReduction]);

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
              <div className="mypage-userinfo-content">{levelInfo.level}</div>
              <button className="mypage-show_level" onClick={handleOpenModal}>
                클릭! 레벨 정보를 확인하세요
              </button>
            </div>

            {isModalOn && (
              <LevelInfo
                levelInfo={levelInfo}
                handleCloseModal={handleCloseModal}
              />
            )}

            <div className="mypage-userinfo-name">
              <div className="mypage-userinfo-title">이름</div>
              <div className="mypage-userinfo-content">{username}</div>
            </div>
            <div className="mypage-userinfo-email">
              <div className="mypage-userinfo-content">{email}</div>
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
          <button onClick={handleClickNum} className="mypage-eco-me">
            나의 환경 지킨 횟수 : {clickNum}
          </button>
          <div className="mypage-eco-total">전체 환경 지킨 횟수</div>
          <div className="mypage-eco-carbon">
            나의 탄소 저감량 : {carbonReduction}
          </div>
        </div>
      </div>
      <div className="mypage-container-bottom">
        <div className="mypage-badge">
          <div className="mypage-badge-title">
            <div>내 뱃지 리스트</div>
          </div>
          <div className="mypage-badge-list">
            <div className="mypage-badge-standard">
              <div>탄소저감량 500g 이상</div>
              <div>탄소저감량 900g 이상</div>
              <div>탄소저감량 2000g 이상</div>
              <div>탄소저감량 3500g 이상</div>
              <div>탄소저감량 5000g 이상</div>
            </div>
            <div className="mypage-badge-image">
              <img
                className="mypage-badge-image-one badgeHide"
                src={badgeImg}
                alt="뱃지 이미지"
                onClick={() => setSelectedBadgeId(badgeList[0].id)}
              ></img>
              <img
                className="mypage-badge-image-two badgeHide"
                src={badgeImg}
                alt="뱃지 이미지"
                onClick={() => setSelectedBadgeId(badgeList[1].id)}
              ></img>
              <img
                className="mypage-badge-image-three badgeHide"
                src={badgeImg}
                alt="뱃지 이미지"
                onClick={() => setSelectedBadgeId(badgeList[2].id)}
              ></img>
              <img
                className="mypage-badge-image-four badgeHide"
                src={badgeImg}
                alt="뱃지 이미지"
                onClick={() => setSelectedBadgeId(badgeList[3].id)}
              ></img>
              <img
                className="mypage-badge-image-five badgeHide"
                src={badgeImg}
                alt="뱃지 이미지"
                onClick={() => setSelectedBadgeId(badgeList[4].id)}
              ></img>
            </div>
          </div>
          {badgeList
            .filter((badge) => badge.id === selectedBadgeId)
            .map((badge) => (
              <div id="mypage-badge-modal">
                <div className="mypage-badge-modal-flex">
                  <button
                    className="mypage-badge-modal-close"
                    onClick={handleCloseBadge}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  <div className="mypage-badge-modal-info-name">
                    {badge.name}
                  </div>
                  <div className="mypage-badge-modal-info-description">
                    {badge.description}
                  </div>
                  <img src={badge.image} alt="뱃지 모달 이미지" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Mypage;
