import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Mypage.scss';
// import { LevelInfo } from '../components/LevelInfo';
import { BadgeInfo } from '../components/BadgeInfo';
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
  const [profileImage, setProfileImage] = useState('');
  const [email, setEmail] = useState('');

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
    level: '',
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

  // 클릭 시, 서버에서 불러오는 기능만 하는 함수
  const handleClickNum = () => {
    axios.post('http://localhost:4000/level/read',
      { clickNum, email },
      { headers: { 'Content-Type': 'application/json' } })
      .then((res) => {
        // console 삭제하면 에러뜨는데 이유 못찾음
        console.log('handleClickNum res :', res)
        console.log('handleClickNum res data.clickNum:', res.data.clickNum);
        //console.log('handleClickNum res data.getUpdateInfo.clickNum:', res.data.getUpdateInfo.clickNum);
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
          .post('http://localhost:4000/level/read',
            { clickNum: clickNum, email: res.data.email },
            {
              headers: {
                'Content-Type': 'application/json',
                //authorization: accessToken,
              },
            }
          ).then((res) => {
            console.log('level : ', res)
            setClickNum(res.data.clickNum);
            setCarbonReduction(res.data.carbonReduction);
            // //level res 에는 res.data.level 없음
            // setLevelInfo({
            //   name: res.data.level.name,
            //   image: res.data.level.image,
            //   description: res.data.level.description,
            //   level: res.data.level.id,
            // })
          })
      })
      .catch((err) => console.log(err));

    // 서버에서 불러와서 상태에 저장하는 리퀘스트
    axios
      .post(
        'http://localhost:4000/badge/read',
        { email: '' },
        {
          headers: {
            'Content-Type': 'application/json',
            //authorization: accessToken,
          },
        },
      )
      .then(({ data }) => {
        setBadgeList(data.badgeAll);
        // 콘솔 지우면 에러뜸
        console.log(data.badgeAll);
      });

  }, [accessToken, setEmail, setClickNum]);

  console.log('email : ', email);
  console.log('clickNum :', clickNum);
  console.log('level :', levelInfo.level);

  return (
    <div className="mypage-container">
      <div className="mypage-container-top">
        <div className="mypage-userinfo">
          <div className="mypage-userinfo-left">
            <img src={profileImage} alt="프로필이미지"></img>
          </div>
          <div className="mypage-userinfo-right">
            <div className="mypage-userinfo-level" >
              <div className="mypage-userinfo-title" >레벨</div>
              <div className="mypage-userinfo-content">{levelInfo.level}</div>
              <button className="mypage-show_level" onClick={handleOpenModal} >클릭! 레벨 정보를 확인하세요</button>
            </div>

            {isModalOn && (<LevelInfo levelInfo={levelInfo} handleCloseModal={handleCloseModal} />)}

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
          <button onClick={handleClickNum} className="mypage-eco-me">나의 환경 지킨 횟수 : {clickNum} </button>
          <div className="mypage-eco-total">전체 환경 지킨 횟수</div>
          <div className="mypage-eco-carbon">나의 탄소 저감량 : {carbonReduction}</div>
        </div>
      </div>
      <div className="mypage-container-bottom">
        <div className="mypage-badge">
          <div className="mypage-badge-title">
            <div>내 뱃지 리스트</div>
          </div>
          {/* <div className="mypage-badge-list">
            {badgeList.map((badge) => (
              // <BadgeInfo
              //   badge={badge}
              //   selectedBadgeId={selectedBadgeId}
              //   setSelectedBadgeId={setSelectedBadgeId}
              // />
            ))}
          </div> */}
        </div>
      </div>
    </div>

  );
}

export default Mypage;