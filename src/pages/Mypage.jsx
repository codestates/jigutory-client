import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import badgeImg from '../images/mypage-badge.png';
import LevelInfo from '../components/LevelInfo';
import useClickOutside from '../hooks/useClickOutside';
import { ScrollButton } from '../components/ScrollButton';
import video from '../images/stoppollution.mp4';
import DotSpinner from '../components/DotSpinner';
import '../styles/Mypage.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Mypage({ accessToken }) {
  const history = useHistory();
  const [addFriends, setAddFriends] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // modal 상태
  const [isModalOn, setIsModalOn] = useState(false);

  //total
  const [totalCnt, setTotalCnt] = useState({});

  // user/userinfo에서 받음
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  // badge/read에서 받음
  const [badgeList, setBadgeList] = useState([]);
  const [selectedBadgeId, setSelectedBadgeId] = useState();

  // level/read 에서 받음
  const [clickNum, setClickNum] = useState(0);
  const [carbonReduction, setCarbonReduction] = useState(0);
  const [levelInfo, setLevelInfo] = useState({
    name: '',
    image: '',
    description: '',
    level: 1,
  });

  const date = createdAt.split('T').splice(0, 1);

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

  // 새로고침시 유저상태 유지
  useLayoutEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL+`/user/userinfo`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken,
        },
      })
      .then((res) => {
        console.log('userinfo res : ', res);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImgUrl(res.data.profileImage);
        setCreatedAt(res.data.createdAt);
        axios
          .post(
            process.env.REACT_APP_API_URL+`/level/read`,
            { email: res.data.email, clickNum: clickNum },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((res) => {
            console.log('level/read res :', res);
            setClickNum(res.data.clickNum);
            setCarbonReduction(res.data.carbonReduction);
            setLevelInfo({ level: res.data.levelNum });
            axios
              .post(
                process.env.REACT_APP_API_URL+`/level/info`,
                { levelNum: res.data.levelNum },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then((res) => {
                console.log(res);
                setLevelInfo({
                  name: res.data.name,
                  image: res.data.image,
                  description: res.data.description,
                  level: res.data.id,
                });
              });
          });
      })
      .catch((err) => console.log(err));
  }, [accessToken, setClickNum]);

  if (imgUrl === null || imgUrl === undefined) {
    setImgUrl(
      'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
    );
  }

  console.log('유저네임 상태 :', username);
  // console.log('이미지 상태', imgUrl);
  console.log('이메일 상태', email);
  console.log('가입일 상태', createdAt);

  // 새로고침시, 전체 클릭넘 & 탄소저감량을 불러옴
  useLayoutEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL+`/intropage`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('total count : ', res);
        setTotalCnt(res.data);
      })
      .catch((err) => console.log(err));
  }, [clickNum, carbonReduction]);

  // 클릭시, 유저의 클릭넘 탄소저감량 레벨을 불러옴
  const handleClickNum = () => {
    console.log('clickNum 클릭 중');
    setIsLoading(true);

    axios
      .post(
        process.env.REACT_APP_API_URL+`/level/read`,
        { email: email, clickNum: clickNum }, // clickNum 을 안보내주면 0이됨
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then((res) => {
        console.log('handleClickNum(level/read) res :', res);
        setClickNum(res.data.clickNum);
        setCarbonReduction(res.data.carbonReduction);
        setLevelInfo({ level: res.data.levelNum });
        setIsLoading(false);
        return res;
      })
      .then((res) => {
        console.log('handleClickNum(level/red)', res);
        axios
          .post(
            process.env.REACT_APP_API_URL+`/level/info`,
            { levelNum: res.data.levelNum },
            { headers: { 'Content-Type': 'application/json' } },
          )
          .then((res) => {
            console.log('level/info : ', res);
            setLevelInfo({
              name: res.data.name,
              image: res.data.image,
              description: res.data.description,
              level: res.data.id,
            });
          });
      });
  };

  // 뱃지 받아오기
  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL+`/badge/read`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(({ data }) => {
        setBadgeList(data.badgeAll);
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

  const handleAddFriends = () => {
    setAddFriends('🛠 개발 중인 기능입니다');
    setTimeout(() => setAddFriends(''), 2000);
    console.log('click');
  };

  const domNode = useClickOutside(() => {
    handleCloseBadge();
  });

  return (
    <>
      <div id="color-box"></div>
      <div id="mypage-container">
        <main id="mypage-wholebox">
          <section id="mypage-left-box">
            <img src={imgUrl}></img>
            <div className="mypage-userinfo-summary">
              <div className="mypage-userinfo-username">
                <span>🌏{username}</span>님
                <div className="mypage-userinfo-createdat">From {date}</div>
              </div>
              <div className="mypage-userinfo-email">{email}</div>
              <button
                className="mypage-userinfo-edit mypage-btn"
                onClick={() => {
                  history.push('/edituser');
                }}
              >
                회원정보 수정
              </button>
            </div>
          </section>
          <section id="mypage-right-box">
            <div id="mypage-badge-header">
              <h3>나의 환경지킴 지수</h3>
              <p>
                <i className="fas fa-exclamation-circle"></i>텀블러 사용 횟수에
                따라 레벨이 달라집니다. 레벨을 클릭하여 멸종위기에 놓인 식물을
                확인하세요 !
              </p>
            </div>
            <div id="mypage-container-level">
              <div className="mypage-userinfo-mylevel">
                <div className="mypage-userinfo-mylevel-section">
                  <span
                    title="클릭! 레벨정보 보기"
                    className="mypage-box-subtitle mypage-box-subtitle-level"
                    onClick={handleOpenModal}
                  >
                    레벨
                    {isModalOn && (
                      <LevelInfo
                        levelInfo={levelInfo}
                        handleCloseModal={handleCloseModal}
                      />
                    )}
                  </span>
                  <span
                    className="mypage-box-contents mypage-mylevel"
                    onClick={handleOpenModal}
                  >
                    Lv. {levelInfo.level}
                  </span>
                </div>
                <div className="mypage-userinfo-mylevel-section">
                  <span className="mypage-box-subtitle">
                    텀블러 사용 횟수
                    <button
                      onClick={handleClickNum}
                      className="mypage-handleclick mypage-btn"
                    >
                      <i className="fa fa-plus-circle mypage-btn"></i>
                    </button>
                  </span>
                  {/* <span className="mypage-box-contents mypage-clicknum">{clickNum} </span> */}
                  {isLoading ? (
                    <DotSpinner />
                  ) : (
                    <span className="mypage-box-contents mypage-clicknum">
                      {clickNum} <span id="mypage-smalltext">회</span>
                    </span>
                  )}
                </div>
                <div className="mypage-userinfo-mylevel-section">
                  <span className="mypage-box-subtitle">누적 탄소 저감량</span>
                  <span className="mypage-box-contents mypage-carbon">
                    {carbonReduction} <span id="mypage-smalltext">g</span>
                  </span>
                </div>
              </div>
            </div>
            <div id="mypage-badge-header">
              <h3>지구토리 유저의 환경지킴 지수</h3>
              <p>
                <i className="fas fa-exclamation-circle"></i>지구토리 모든
                유저의 환경지킴 지수입니다. '{totalCnt.totalCarbon}g' 만큼의
                탄소배출이 줄어들었어요 !
              </p>
            </div>
            <div id="mypage-container-total">
              <div className="mypage-total-user">
                <div className="mypage-total-user-section">
                  <span className="mypage-box-subtitle">
                    전체 텀블러 사용 횟수
                  </span>
                  <span className="mypage-box-contents">
                    {totalCnt.totalClicks} <span id="mypage-smalltext">회</span>
                  </span>
                </div>
                <div className="mypage-total-user-section">
                  <span className="mypage-box-subtitle">전체 탄소저감량</span>
                  <span className="mypage-box-contents">
                    {totalCnt.totalCarbon} <span id="mypage-smalltext">g</span>
                  </span>
                </div>
              </div>
            </div>
            <div id="mypage-container-etc">
              <div id="mypage-container-etc-video">
                <video className="video" autoPlay muted loop>
                  <source src={video} type="video/mp4" width />
                </video>
              </div>
              <div id="mypage-container-etc-desc">
                <div>
                  <h4>국내 플라스틱컵 사용량 연간 33억개</h4>
                  <p>
                    플라스틱컵 한 개를 만들고 폐기하는데 약 25g의 이산화탄소가
                    배출됩니다. <br />
                    오늘도 지구토리와 함께 탄소발자국을 줄여보세요 !{' '}
                  </p>
                  <button onClick={handleAddFriends}> 친구초대</button>
                  {<div id="mypage-addfriends">{addFriends}</div>}
                </div>
              </div>
            </div>
            <div id="mypage-badge-header">
              <h3>나의 환경 뱃지</h3>
              <p>
                <i className="fas fa-exclamation-circle"></i>뱃지는 누적
                탄소저감량에 따라 획득할 수 있습니다. 클릭하여 멸종위기에 놓인
                동물을 확인하세요 !
              </p>
            </div>
            <div id="mypage-container-badge">
              <div className="mypage-badge-list">
                <div id="mypage-badge-list-wrapper">
                  <div className="mypage-badge-contentbox">
                    <span className="mypage-box-subtitle">
                      500g <i className="fas fa-arrow-circle-up"></i>
                    </span>
                    <img
                      className="mypage-badge-image-one badgeHide"
                      src={badgeImg}
                      alt="뱃지 이미지"
                      onClick={() => setSelectedBadgeId(badgeList[0].id)}
                    ></img>
                  </div>
                  <div className="mypage-badge-contentbox">
                    <span className="mypage-box-subtitle">
                      900g <i className="fas fa-arrow-circle-up"></i>
                    </span>
                    <img
                      className="mypage-badge-image-two badgeHide"
                      src={badgeImg}
                      alt="뱃지 이미지"
                      onClick={() => setSelectedBadgeId(badgeList[1].id)}
                    ></img>
                  </div>
                  <div className="mypage-badge-contentbox">
                    <span className="mypage-box-subtitle">
                      2000g <i className="fas fa-arrow-circle-up"></i>
                    </span>
                    <img
                      className="mypage-badge-image-three badgeHide"
                      src={badgeImg}
                      alt="뱃지 이미지"
                      onClick={() => setSelectedBadgeId(badgeList[2].id)}
                    ></img>
                  </div>
                  <div className="mypage-badge-contentbox">
                    <span className="mypage-box-subtitle">
                      3500g <i className="fas fa-arrow-circle-up"></i>
                    </span>
                    <img
                      className="mypage-badge-image-four badgeHide"
                      src={badgeImg}
                      alt="뱃지 이미지"
                      onClick={() => setSelectedBadgeId(badgeList[3].id)}
                    ></img>
                  </div>
                  <div className="mypage-badge-contentbox">
                    <span className="mypage-box-subtitle">
                      5000g <i className="fas fa-arrow-circle-up"></i>
                    </span>
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
                  .map((badge, idx) => (
                    <div id="mypage-badgeinfo" key={idx} ref={domNode}>
                      <div id="mypage-badgeinfo-box">
                        <div>
                          <img src={badge.image} alt="멸종 위기 동물" />
                        </div>
                        <div>
                          <span className="mypage-badgeinfo-name">
                            👑 {badge.name}
                          </span>
                          <p className="mypage-badgeinfo-description">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <ScrollButton />
          </section>
        </main>
      </div>
    </>
  );
}

export default Mypage;
