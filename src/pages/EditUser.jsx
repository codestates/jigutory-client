import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import DeleteUserModal from '../components/DeleteUserModal';
import { ScrollButton } from '../components/ScrollButton';
import '../styles/EditUser.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

// 회원정보 수정 클릭하면 바로 비밀번호 확인부터 뜸
// 탈퇴 확인 모달창 띄우고, 탈퇴하기 실행되면 인풋리셋시키고 인트로 페이지로 이동
const EditUser = ({ accessToken, handleUserInfo, isLogout }) => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [imgUrl, setImgUrl] = useState(
    'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
  );
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setnewPasswordCheck] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const [changeNicknameMessage, setChangeNicknameMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [imgConfirmMessage, setImgConfirmMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4000/user/userinfo', {
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('edituser :', res);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImgUrl(res.data.profileImage);
        setPassword(res.data.password);
        handleUserInfo({
          username: res.data.username,
          email: res.data.email,
          imgUrl: res.data.profileImage,
        });
      })
      .catch((err) => console.log(err));
  }, [accessToken]);

  if (imgUrl === null || imgUrl === undefined) {
    setImgUrl(
      'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
    );
  }

  const onKeyPressUsername = (e) => {
    if (e.key === 'Enter') {
      usernameRequestHandler();
    }
  };

  const onKeyPressPassword = (e) => {
    if (e.key === 'Enter') {
      newPasswordRequestHandler();
    }
  };

  const handleOpenModal = () => {
    setIsModalOn(true);
  };

  const handleCloseModal = () => {
    setIsModalOn(false);
  };

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (password !== e.target.value) {
      setErrorMessage('비밀번호를 확인해 주세요');
    }
    setPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  };

  const handleNewPasswordCheck = (e) => {
    e.preventDefault();
    setnewPasswordCheck(e.target.value);
  };

  const handleUploadImg = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    setImgFile(file);
    reader.onloadend = () => {
      setImgUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitImg = (e) => {
    e.preventDefault();
    if (imgUrl) {
      axios
        .patch(
          'http://localhost:4000/user/useredit',
          { profileImage: imgUrl },
          {
            headers: {
              authorization: accessToken,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setImgConfirmMessage('✅ 프로필사진이 변경되었습니다');
            return true;
          }
        })

        .catch((err) => console.log(err));
    }
  };

  // const resetUsernameInput = () => {
  //   setUsername('');
  // }

  // ------------------------------------------------------------
  const validateUsername = (username) => {
    const min = 3;
    const regUsernaae = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9a-z]+$/;

    // 이름 길이 확인
    if (username.length < min) {
      setUsernameError('❌ 3자 이상 입력');
      return false;
    }

    // 이름 정규식 확인
    if (!regUsernaae.test(username)) {
      setUsernameError('❌ 한글 / 영문 소문자 / 숫자만 허용');
      return false;
    } else {
      setUsernameError('');
      return true;
    }
  };

  const validatePassword = (newPassword, newPasswordCheck) => {
    // if (newPasswordCheck.length === 0) {
    //   setPasswordCheckError('❌ 동일한 비밀번호를 입력해 주세요');
    // }
    if (newPassword !== newPasswordCheck) {
      setPasswordCheckError('❌ 동일한 비밀번호를 입력해 주세요');
      return false;
    }

    const min = 8;
    const max = 20;
    const regPassword = /^[0-9a-z-_.!?*]+$/;

    // 비밀번호 길이 확인
    if (newPassword.length < min || newPassword.length > max) {
      setPasswordError('❌ 8~20자 입력');
      return false;
    }

    // 비밀번호 정규식 확인
    if (!regPassword.test(password)) {
      setPasswordError('❌ 영문 소문자 / 숫자 / 특수문자(-_.!?*)만 허용');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  //---------------------------------------------------------------

  const usernameRequestHandler = () => {
    const validUsername = validateUsername(username);
    if (validUsername) {
      axios
        .patch(
          'http://localhost:4000/user/useredit',
          { username: username },
          {
            headers: {
              authorization: accessToken,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          console.log(res);
          handleUserInfo({ username: username });
          setChangeNicknameMessage('✅ 닉네임이 변경되었습니다');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const newPasswordRequestHandler = () => {
    const validPassword = validatePassword(newPassword, newPasswordCheck);
    if (validPassword) {
      axios
        .patch(
          'http://localhost:4000/user/passwordedit',
          { rvsdpassword: newPasswordCheck },
          {
            headers: {
              authorization: accessToken,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          setConfirmMessage('✅ 비밀번호가 변경되었습니다');
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(imgConfirmMessage);
  return (
    <div id="edituser_page">
      <div>
        <div id="edituser_container">
          <h2> 회원정보 수정 </h2>
          <img
            className="edituser_profile_preview"
            alt="유저이미지"
            src={imgUrl}
          />
          <div id="edituser_img">
            <input
              id="file"
              className="edit_user_fileupload"
              type="file"
              accept="image/*"
              onChange={handleUploadImg}
            ></input>
            <div id="img_volume">
              <i className="fas fa-exclamation-circle"></i>
              <span>100kb 미만 이미지만 업로드 가능합니다</span>
            </div>
            <div>
              <label htmlFor="file" className="file_label">
                사진 등록
              </label>
              <button className="file_label" onClick={handleSubmitImg}>
                변경
              </button>
            </div>
            {!imgConfirmMessage ? (
              ''
            ) : (
              <div id="edituser_confirm-image">{imgConfirmMessage}</div>
            )}
          </div>
          <section>
            <div id="edituser_email">
              <div>이메일</div>
              <div>{email}</div>
            </div>
            <div id="edituser_username">
              <div>닉네임</div>
              <input
                id="username"
                type="text"
                placeholder={username}
                onChange={handleUsername}
                onKeyPress={onKeyPressUsername}
              />
            </div>
            {!usernameError ? (
              ''
            ) : (
              <div className="edituser_confirm_msg">
                <div className="edituser_failure">{usernameError}</div>
              </div>
            )}
            <div>
              <div></div>
              <button
                className="edituser_changebtn"
                onClick={usernameRequestHandler}
              >
                닉네임 변경
              </button>
            </div>
            <div className="edituser_confirm_msg">
              <div>{changeNicknameMessage}</div>
            </div>
            <div id="edituser_password">
              <div>현재 비밀번호</div>
              <input
                id="current_password"
                type="password"
                onChange={handlePassword}
                placeholder="사용 중인 비밀번호를 입력하세요."
                value={password}
              />
            </div>
            <div id="edituser_password">
              <div>새 비밀번호</div>
              <input
                id="new_password"
                type="password"
                onChange={handleNewPassword}
                placeholder="영문 소문자 / 숫자 / 특수문자(-_.!?*), 8~20자 "
              />
            </div>
            {!passwordError ? (
              ''
            ) : (
              <div className="edituser_confirm_msg">
                <div className="edituser_failure">{passwordError}</div>
              </div>
            )}
            <div id="edituser_password">
              <div>새 비밀번호 확인</div>
              <input
                id="confirm_password"
                type="password"
                onChange={handleNewPasswordCheck}
                onKeyPress={onKeyPressPassword}
                placeholder="다시 한 번 입력하세요."
              />
            </div>
            {!passwordCheckError ? (
              ''
            ) : (
              <div className="edituser_confirm_msg">
                <div className="edituser_failure">{passwordCheckError}</div>
              </div>
            )}
            {
              <div>
                <div></div>
                <button
                  className="edituser_changebtn"
                  onClick={newPasswordRequestHandler}
                >
                  비밀번호 변경
                </button>
              </div>
            }
            <div className="edituser_confirm_msg">
              <div>{confirmMessage}</div>
            </div>
          </section>
          <div id="edituser_withdrawal">
            <div></div>
            <button onClick={handleOpenModal}>회원 탈퇴</button>
            <button
              onClick={() => {
                history.push('/mypage');
              }}
            >
              마이페이지로 돌아가기
            </button>
          </div>
          {isModalOn && (
            <DeleteUserModal
              accessToken={accessToken}
              handleCloseModal={handleCloseModal}
              isLogout={isLogout}
            />
          )}
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};

export default withRouter(EditUser);
