import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { LevelInfo } from '../components/LevelInfo';
import badgeImg from '../images/mypage-badge.png';
import '../styles/Mypage.scss';
import axios from 'axios';
import LevelInfo from '../components/LevelInfo';
import useClickOutside from '../hooks/useClickOutside';
axios.defaults.withCredentials = true;

function Mypage({ accessToken }) {
  const history = useHistory();

  // modal 상태
  const [isModalOn, setIsModalOn] = useState(false);

  // user/userinfo 에서 받음
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  // badge/read에서 받음
  const [badgeList, setBadgeList] = useState([]);
  const [selectedBadgeId, setSelectedBadgeId] = useState();

  // 클릭넘이 0일때는 level 인포를 받아오지 못하기때문에
  // 초기값으로 레벨1에 해당하는 정보를 넣어줌
  const [clickNum, setClickNum] = useState(0);
  const [carbonReduction, setCarbonReduction] = useState(0);
  const [levelInfo, setLevelInfo] = useState({
    name: '',
    image: '',
    description: '',
    level: 1,
  });

  if (!imgUrl) {
    setImgUrl(
      'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png');
  }

  // modal 핸들링 함수
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

  // user/userinfo 받기
  useEffect(() => {
    axios
      .get('http://localhost:4000/user/userinfo', {
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken,
        },
      })
      .then((res) => {
        console.log('userinfo res : ', res)
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImgUrl(res.data.profileImage);
      })
  }, [accessToken]);

  console.log('유저네임 상태 :', username);
  console.log('이미지 상태', imgUrl);
  console.log('이메일 상태', email);

  // level/info 받아오고, db에 저장된 유저의 클릭, 탄소, 레벨도 받아옴 
  useEffect(() => {
    axios
      .post('http://localhost:4000/level/info',
        {
          // clickNum: clickNum,
          // carbonReduction: carbonReduction,
          levelNum: levelInfo.level
        },
        { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        console.log('level : ', res)
        setLevelInfo({
          name: res.data.name,
          image: res.data.image,
          description: res.data.description,
          level: res.data.id,
        })
      })
      .catch((err) => console.log(err));
  }, [])

  // 클릭 시, db에서 받아옴 (클릭 수 증가시킴 => 탄소저감량 증가)
  const handleClickNum = () => {
    console.log('clickNum 클릭 중')

    axios.post('http://localhost:4000/level/read',
      { email: email },
      { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        console.log('handleClickNum res :', res)
        setClickNum(res.data.clickNum);
        setCarbonReduction(res.data.carbonReduction);
      })
      .catch(res => console.log(res))
  }


  // 뱃지 받아오기 (처음 한 번만 뱃지정보 전체 받아옴)
  useEffect(() => {
    axios
      .post(
        'http://localhost:4000/badge/read',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({ data }) => {
        setBadgeList(data.badgeAll);
        console.log(data.badgeAll);
      });

  }, []);

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
    <>
      <div id="color-box"></div>
      <div id="mypage-container">
        <main id="mypage-wholebox">

          <section id="mypage-left-box">
            <img src={imgUrl} ></img>
            <div className="mypage-userinfo-summary">
              <div className="mypage-userinfo-username">{username} 님 </div>
              <div className="mypage-userinfo-content">{email}</div>
              <button className="mypage-userinfo-edit" onClick={() => { history.push('/edituser') }}>회원정보 수정</button>
            </div>
          </section>


          <section id="mypage-right-box">
            <h3>나의 환경지킴 지수</h3>
            <div id="mypage-container-top">
              <div className="mypage-userinfo-mylevel">
                <div className="mypage-userinfo-mylevel-section">
                  <span className="mypage-box-subtitle">마이 레벨</span>
                  <button className="mypage-show_level" onClick={handleOpenModal} >Lv. {levelInfo.level}</button>
                  {isModalOn && (<LevelInfo levelInfo={levelInfo} handleCloseModal={handleCloseModal} />)}
                </div>
                <div className="mypage-userinfo-mylevel-section">
                  <span className="mypage-box-subtitle">텀블러 사용 횟수</span>
                  <button onClick={handleClickNum} className="mypage-eco-me">{clickNum} </button>
                </div>
                <div className="mypage-userinfo-mylevel-section">
                  <span className="mypage-box-subtitle">탄소 저감량</span>
                  <span className="mypage-eco-carbon">{carbonReduction}</span>
                </div>
              </div>
            </div>


            <h3>지구토리 유저의 환경지킴 지수</h3>

            <div id="mypage-container-second">
              <div className="mypage-total-user">
                <div className="mypage-total-user-section">
                  <span className="mypage-box-subtitle">지구토리 유저 텀블러 사용 횟수</span>
                  <span>100</span>
                </div>
                <div className="mypage-total-user-section">
                  <span className="mypage-box-subtitle">지구토리 유저 탄소저감량</span>
                  <span>50,000</span>
                </div>
              </div>
            </div>


            <h3>나의 환경 뱃지</h3>

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


          </section>
        </main>

      </div >
    </>
  );
}

export default Mypage;