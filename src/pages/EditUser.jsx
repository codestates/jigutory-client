import React, { useEffect, useState, useCallback } from 'react';
import '../styles/EditUser.scss';
import axios from 'axios';

// 회원정보 수정 클릭하면 바로 비밀번호 확인부터 뜸

const EditUser = ({ accessToken, userInfo }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgFile, setImgFile] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 현재 비밀번호 확인할 때
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  if (imgUrl === null || imgUrl === undefined) {
    setImgUrl('https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png')
  }

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  }

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
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

  // const usernameRequestHandler = () => {

  // }

  // const passwordRequestHandler = () => {

  // }

  // const usernameRequestHandler = () => {

  // }

  useEffect(() => {
    axios.get('http://localhost:4000/user/userinfo', {
      headers: {
        authorization: accessToken,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log('edituser :', res)
        setUsername(res.data.username);
        setEmail(res.data.email);
        setImgUrl(res.data.profileImage);
        setPassword(res.data.password);
      })
      .catch(err => console.log(err))
  }, [])


  console.log('edit username :', username)

  return (
    <div id="edituser_page">
      <div>
        <div id="edituser_container">
          <h2> {username} 님의 회원정보 수정 </h2>
          <img className="edituser_profile_preview" src={imgUrl} />

          <div id="edituser_img">
            <input id="file" className="edit_user_fileupload" type="file" accept="image/*" onChange={handleUploadImg}></input>
            <label htmlFor="file" className="file_label">프로필 사진 등록</label>
          </div>

          <div id="edituser_email">
            <label htmlFor="username">이메일</label>
            <input id="username" type="text" placeholder={email} onChange={handleEmail} />
          </div>

          <div id="edituser_username">
            <label htmlFor="username">이름</label>
            <input id="username" type="text" placeholder={username} onChange={handleUsername} />

          </div>

          <div id="edituser_password">
            <label htmlFor="current_password">현재 비밀번호</label>
            <input id="current_password" type="password" onChange={handlePassword} />
          </div>

          <div id="edituser_password">
            <label htmlFor="new_password">새 비밀번호</label>
            <input id="new_password" type="password" placeholder={newPassword} />
          </div>

          <div id="edituser_password">
            <label htmlFor="confirm_password">비밀번호 확인</label>
            <input id="confirm_password" type="password" placeholder={confirmNewPassword} />
          </div>
          <div id="edituser_withdrawal">
            <button>회원 탈퇴</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default EditUser;