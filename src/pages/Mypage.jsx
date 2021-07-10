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
  const [profileImage, setProfileImage] = useState('');

  // badge/read에서 받음
  const [badgeList, setBadgeList] = useState([]);
  const [selectedBadgeId, setSelectedBadgeId] = useState();

  // level/read 에서 받음
  // 클릭넘이 0일때는 level 인포를 받아오지 못하기때문에
  // 초기값으로 레벨1에 해당하는 정보를 넣어줌
  const [clickNum, setClickNum] = useState(0);
  const [carbonReduction, setCarbonReduction] = useState(0);
  const [levelInfo, setLevelInfo] = useState({
    name: '해파리 나무 (Jellyfish Tree)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Jellyfishtreefruits.jpg',
    description: '세이셸의 마에 섬에 자생하는 속씨식물로서 꽃의 암술이 해파리의 촉수를 닮아서 해파리나무로 불린다. 가뭄에 견디는 내한성을 지니며 바람을 통해 씨앗을 퍼뜨린다. 국제자연보전연맹( IUCN) 멸종위기 “위급” 단계로 분류된다. ',
    level: 1,
  });

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

  // 클릭 시, db에서 받아옴 
  const handleClickNum = () => {
    axios.post('http://localhost:4000/level/read',
      { clickNum, email },
      { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        // console 삭제하면 에러뜨는데 이유 못찾음
        console.log('handleClickNum res :', res)
        if (!res.data.getUpdateInfo) {
          setClickNum(res.data.clickNum);
          setCarbonReduction(res.data.carbonReduction);
        }
        else if (res.data.getUpdateInfo) {
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
        }
        else {
          return false;
        }
      })
      .catch(res => console.log(res))
  }

  if (!profileImage) {
    setProfileImage(
      'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
    );
  }

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/userinfo', {
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken,
        },
      })
      .then((res) => {
        setUsername(res.data.username);
        setProfileImage(res.data.profileImage);
        setEmail(res.data.email);
        console.log('email :', res.data.email);
        // 아래 axios 역할 : db 에 저장된 정보를 받아와서 다음 로그인시 유저 레벨과 클릭수를 불러옴
        // 지우면 db  badge 테이블의 유저정보를 불러올 수 없음
        // 살려두면 clickNum이 0일경우 +1이 될 수 밖에 없음..
        axios
          .post('http://localhost:4000/level/read',
            // 레벨 필드 생기면 보내줌
            { clickNum: clickNum, email: res.data.email },
            {
              headers: {
                'Content-Type': 'application/json',
                //authorization: accessToken,
              },
            }
          ).then((res) => {
            console.log('level : ', res)
            // 여기서는 현재 clickNum, carbonReduction, level 상태를 db로 보내줌
            // 0을 보내주면 서버 35번째 줄에서 +1을 해서 보내줌 
            // 핸들클릭을 하지 않아도 초기 한 번만 받아오기 때문에 0일때만 자동으로 1이 되어서 들어옴
            setClickNum(res.data.clickNum);
            setCarbonReduction(res.data.carbonReduction);
            // //level badge 테이블에 필드 생기면 보내주고 받아오면됨
            // setLevelInfo({
            //   name: res.data.level.name,
            //   image: res.data.level.image,
            //   description: res.data.level.description,
            //   level: res.data.level.id,
            // })
          })
      })
    //.catch((err) => console.log(err));

    // 서버에서 불러와서 상태에 저장하는 리퀘스트
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
        // 콘솔 지우면 에러뜸
        console.log(data.badgeAll);
      });

  }, []);

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
    <>
      <div id="color-box"></div>
      <div id="mypage-container">
        <main id="mypage-wholebox">

          <section id="mypage-left-box">
            <img src={profileImage} ></img>
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