import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import '../styles/EditUser.scss';
import axios from 'axios';
import DeleteUserModal from '../components/DeleteUserModal';
axios.defaults.withCredentials = true;

// 회원정보 수정 클릭하면 바로 비밀번호 확인부터 뜸
// 탈퇴 확인 모달창 띄우고, 탈퇴하기 실행되면 인풋리셋시키고 인트로 페이지로 이동 
const EditUser = ({ accessToken, isLoggedOut, handleUserInfo }) => {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [imgUrl, setImgUrl] = useState('https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [changeNicknameMessage, setChangeNicknameMessage] = useState('');

  if (imgUrl === null || imgUrl === undefined) {
    setImgUrl('https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png')
  }

  const handleOpenModal = () => {
    setIsModalOn(true);
  }

  const handleCloseModal = () => {
    setIsModalOn(false);
  }

  const handleDeleteUser = (boolean) => {
    setDeleteUser(boolean);
  }

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const handleNewPassword = (e) => {
    e.preventDefault();
    setNewPassword(e.target.value);
  }

  const handleConfirmNewPassword = (e) => {
    e.preventDefault();
    setConfirmNewPassword(e.target.value);
  }

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
  }

  const handleSubmitImg = async (e) => {
    e.preventDefault();
    await axios.patch('http://localhost:4000/user/useredit',
      { profileImage: imgUrl }, {
      headers: {
        authorization: accessToken,
        "Content-Type": "application/json",
      }, withCredentials: true
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  const usernameRequestHandler = async () => {
    if (imgUrl) {
      await axios.patch('http://localhost:4000/user/useredit',
        { username: username },
        {
          headers: {
            authorization: accessToken,
            "Content-Type": "application/json",
          },
        }).then(res => {
          console.log(res)
          setChangeNicknameMessage('닉네임이 변경되었습니다')
        })
        .catch(err => console.log(err));
    }
  }

  const newPasswordRequestHandler = async () => {
    await axios.patch('http://localhost:4000/user/passwordedit',
      { rvsdpassword: confirmNewPassword },
      {
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json",
        },
      }).then(res => console.log(res))
      .catch(err => console.log(err));
  }


  useEffect(async () => {
    if (accessToken) {
      axios.get('http://localhost:4000/user/userinfo', {
        headers: {
          authorization: accessToken,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log('edituser :', res)
          setUsername(res.data.username);
          setEmail(res.data.email);
          setImgUrl(res.data.profileImage);
          setPassword(res.data.password);
          handleUserInfo({
            username: res.data.username,
            email: res.data.email,
            imgUrl: res.data.profileImage
          })
        })
        .catch(err => console.log(err))
    }
  }, [setUsername, setEmail, setImgUrl, setPassword])




  return (
    <div id="edituser_page">
      <div>
        <div id="edituser_container">
          <h2> 회원정보 수정 </h2>
          <img className="edituser_profile_preview" src={imgUrl} />

          <div id="edituser_img">
            <input id="file" className="edit_user_fileupload" type="file" accept="image/*" onChange={handleUploadImg}></input>
            <label htmlFor="file" className="file_label">프로필 사진 등록</label>
            <button onClick={handleSubmitImg}>확인</button>
          </div>

          <div id="edituser_email">
            <label htmlFor="email">이메일은 변경할 수 없습니다</label>
            <input id="email" type="text" value={email} alt="이메일은 변경할 수 없습니다" />
          </div>

          <div id="edituser_username">
            <label htmlFor="username">닉네임</label>
            <input id="username" type="text" placeholder={username} onChange={handleUsername} />
          </div>
          <div>
            <label htmlFor=""></label>
            <button onClick={usernameRequestHandler}>닉네임 변경</button>
          </div>
          <div>
            {changeNicknameMessage}
          </div>

          <div id="edituser_password">
            <label htmlFor="current_password">현재 비밀번호</label>
            <input id="current_password" type="password" onChange={handlePassword} />
          </div>

          <div id="edituser_password">
            <label htmlFor="new_password">새 비밀번호</label>
            <input id="new_password" type="password" onChange={handleNewPassword} />
          </div>

          <div id="edituser_password">
            <label htmlFor="confirm_password">비밀번호 확인</label>
            <input id="confirm_password" type="password" onChange={handleConfirmNewPassword} />
          </div>
          <div>
            <label htmlFor=""></label>
            <button onClick={newPasswordRequestHandler}>비밀번호 변경</button>
          </div>

          <div id="edituser_withdrawal">
            <button onClick={(handleOpenModal)} >회원 탈퇴</button>
            <section>
              {isModalOn && (<DeleteUserModal handleDeleteUser={handleDeleteUser} accessToken={accessToken} isLoggedOut={isLoggedOut} handleCloseModal={handleCloseModal} />)}

            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(EditUser);
