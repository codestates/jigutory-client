import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import badgeImg from '../images/mypage-badge.png';
import LevelInfo from '../components/LevelInfo';
import useClickOutside from '../hooks/useClickOutside';
import video from '../images/stoppollution.mp4';
import marine from '../images/marine-pollution.png';
import '../styles/Mypage.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Mypage({ accessToken }) {
  const history = useHistory();
  const [addFriends, setAddFriends] = useState('');
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

  // user/userinfo 받기 (토큰이 들어올 때 마다 업뎃 [accessToken] : 새로고침시 유저상태 유지 목적)
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
        setCreatedAt(res.data.createdAt)
        axios
          .post('http://localhost:4000/level/read',
            { email: res.data.email, clickNum: clickNum }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            console.log('level/read res :', res);
            setClickNum(res.data.clickNum);
            setCarbonReduction(res.data.carbonReduction);
            setLevelInfo({ level: res.data.levelNum });
          })
      })
      .catch(err => console.log(err));
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

  useEffect(() => {
    axios.get('http://localhost:4000/intropage', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log('total count : ', res);
        setTotalCnt(res.data);
      })
      .catch(err => console.log(err))
  }, [clickNum, carbonReduction])

  // level/info 받아오고, db에 저장된 유저의 클릭, 탄소, 레벨도 받아와야함 
  // => userinfo 받아올때 then 안에서 level/read로 받아보기
  // useEffect(() => {
  //   axios
  //     .post('http://localhost:4000/level/info',
  //       {
  //         // 여기서 이메일을 보내줘서 level info를 확인하고 받아올수는 없을까?

  //         // clickNum: clickNum,
  //         // carbonReduction: carbonReduction,
  //         levelNum: levelInfo.level
  //       },
  //       { headers: { 'Content-Type': 'application/json' } })
  //     .then((res) => {
  //       console.log('level/info : ', res)
  //       setLevelInfo({
  //         name: res.data.name,
  //         image: res.data.image,
  //         description: res.data.description,
  //         level: res.data.id
  //       })
  //     })
  //     .catch((err) => console.log(err));
  // }, [levelInfo.level, clickNum]) // 여기서 clickNum을 넣으면 level이 초기화됨. 근데 안넣으면 레벨 정보가 마지막에 달랑 레벨만 들어옴

  // 클릭 시, db에서 받아옴 (클릭 수 & 탄소저감량 증가) 
  // [] (일반로그인 & 구글로그인 확인) 0일 때, 클릭 수 증가 안 함 => 새로고침 유지되는지 확인 불가
  // (구글로그인 확인) 0이 아닐 때, 클릭 수 증가함, 레벨 증가하는데 초기레벨값이 1로 안 떠서 11이 되면 레벨1이 되고 16되면 레벨2가 됨 => 해결 : 109번째 줄 if에 1추가
  // => 새로고침하면 초기값으로 돌아갔다가 클릭하면 들어옴 
  // => level/read or info에서 (info에 있어야할 것 같음)clickNum, carbonReduction, levelNum을 저장해 주고 있지 않음 (res로 안 들어옴)
  const handleClickNum = () => {
    console.log('clickNum 클릭 중')

    axios.post('http://localhost:4000/level/read',
      { email: email, clickNum: clickNum },
      { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        console.log('handleClickNum(level/read) res :', res)
        setClickNum(res.data.clickNum);
        setCarbonReduction(res.data.carbonReduction);
        setLevelInfo({ level: res.data.levelNum });
        return res;
      })
      .then((res) => {
        console.log('제발', res);
        axios
          .post('http://localhost:4000/level/info',
            {
              // 여기서 이메일을 보내줘서 level info를 확인하고 받아올수는 없을까?
              // clickNum: clickNum,
              // carbonReduction: carbonReduction,
              levelNum: levelInfo.level
            },
            { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            console.log('level/info : ', res)
            setLevelInfo({
              name: res.data.name,
              image: res.data.image,
              description: res.data.description,
              level: res.data.id
            })
          })
      })
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
    setTimeout(() => setAddFriends(''), 2000)
    console.log('click');
  }

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(handleAddFriends)
  //   }
  // }, [setAddFriends])

  const domNode = useClickOutside(() => {
    handleCloseBadge();
  });

  console.log('마이페이지 레벨인포 찍어보기 :', levelInfo)

  return (
    <>
      <div id="color-box"></div>
      {/* <video className="video" autoPlay muted loop>
          <source src={video} type="video/mp4" height="100px" />
        </video> */}
      <div id="mypage-container">
        <main id="mypage-wholebox">

          <section id="mypage-left-box">
            <img src={imgUrl} ></img>
            <div className="mypage-userinfo-summary">
              <div className="mypage-userinfo-username">
                <span>🌏{username}</span>님
                <div className="mypage-userinfo-createdat">From {date}</div>
              </div>
              <div className="mypage-userinfo-email">{email}</div>
              <button className="mypage-userinfo-edit mypage-btn" onClick={() => { history.push('/edituser') }}>
                회원정보 수정
              </button>
            </div>
          </section>


          <section id="mypage-right-box">

            <h3>나의 환경지킴 지수</h3>
            <div id="mypage-container-level">
              <div className="mypage-userinfo-mylevel">
                <div className="mypage-userinfo-mylevel-section">
                  <span title="클릭! 레벨정보 보기" className="mypage-box-subtitle mypage-box-subtitle-level" onClick={handleOpenModal}>레벨
                    {isModalOn && (<LevelInfo levelInfo={levelInfo} handleCloseModal={handleCloseModal} />)}
                  </span>
                  <span className="mypage-box-contents mypage-mylevel">Lv. {levelInfo.level}</span>
                </div>
                <div className="mypage-userinfo-mylevel-section">
                  <span className="mypage-box-subtitle">텀블러 사용 횟수
                     <button onClick={handleClickNum} className="mypage-handleclick mypage-btn">
                      <i className="fa fa-plus-circle mypage-btn"></i>
                    </button>
                  </span>
                  <span className="mypage-box-contents mypage-clicknum">{clickNum} </span>
                </div>
                <div className="mypage-userinfo-mylevel-section">
                  <span className="mypage-box-subtitle">누적 탄소 저감량</span>
                  <span className="mypage-box-contents mypage-carbon">{carbonReduction}</span>
                </div>
              </div>
            </div>


            <h3>지구토리 유저의 환경지킴 지수</h3>
            <div id="mypage-container-total">
              <div className="mypage-total-user">
                <div className="mypage-total-user-section">
                  <span className="mypage-box-subtitle">전체 텀블러 사용 횟수</span>
                  <span className="mypage-box-contents">{totalCnt.totalClicks}</span>
                </div>
                <div className="mypage-total-user-section">
                  <span className="mypage-box-subtitle">전체 탄소저감량</span>
                  <span className="mypage-box-contents">{totalCnt.totalCarbon}</span>
                </div>
              </div>
            </div>

            <div id="mypage-container-etc" >
              <div id="mypage-container-etc-video">
                <video className="video" autoPlay muted loop>
                  <source src={video} type="video/mp4" width />
                </video>
              </div>

              <div id="mypage-container-etc-desc">
                {/* <img src={marine} alt="icon_marin-pollution" /> */}
                <div>
                  <h4>국내 플라스틱컵 사용량 연간 33억개</h4>
                  <p>플라스틱컵 한 개를 만들고 폐기하는데 약 25g의 이산화탄소가 배출됩니다. <br />오늘도 지구토리와 함께 탄소발자국을 줄여보세요 ! </p>
                  <button onClick={handleAddFriends}> 친구초대</button>
                  {<div id="mypage-addfriends">{addFriends}</div>}
                </div>
              </div>

            </div>

            <div id="mypage-badge-header">
              <h3>나의 환경 뱃지</h3>
              <p><i className="fas fa-exclamation-circle"></i>뱃지는 누적 탄소저감량에 따라 획득할 수 있습니다. 마우스를 올려 뱃지 정보를 확인하세요 !</p>
            </div>
            <div id="mypage-container-badge">
              <div className="mypage-badge-list">
                <div className="mypage-badge-contentbox">
                  <span className="mypage-box-subtitle"> 500g <i className="fas fa-arrow-circle-up"></i></span>
                  <img
                    className="mypage-badge-image-one badgeHide"
                    src={badgeImg}
                    alt="뱃지 이미지"
                    onClick={() => setSelectedBadgeId(badgeList[0].id)}
                  ></img>
                </div>

                <div className="mypage-badge-contentbox">
                  <span className="mypage-box-subtitle"> 900g <i className="fas fa-arrow-circle-up"></i></span>
                  <img
                    className="mypage-badge-image-two badgeHide"
                    src={badgeImg}
                    alt="뱃지 이미지"
                    onClick={() => setSelectedBadgeId(badgeList[1].id)}
                  ></img>
                </div>


                <div className="mypage-badge-contentbox">
                  <span className="mypage-box-subtitle"> 2000g <i className="fas fa-arrow-circle-up"></i></span>
                  <img
                    className="mypage-badge-image-three badgeHide"
                    src={badgeImg}
                    alt="뱃지 이미지"
                    onClick={() => setSelectedBadgeId(badgeList[2].id)}
                  ></img>
                </div>

                <div className="mypage-badge-contentbox">
                  <span className="mypage-box-subtitle"> 3500g <i className="fas fa-arrow-circle-up"></i></span>
                  <img
                    className="mypage-badge-image-four badgeHide"
                    src={badgeImg}
                    alt="뱃지 이미지"
                    onClick={() => setSelectedBadgeId(badgeList[3].id)}
                  ></img>
                </div>

                <div className="mypage-badge-contentbox">
                  <span className="mypage-box-subtitle"> 5000g <i className="fas fa-arrow-circle-up"></i></span>
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
                  <div id="mypage-badge-modal" key={idx} ref={domNode}>
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
            {/* </div> */}


          </section>
        </main>


      </div >
    </>
  );
}

export default Mypage;