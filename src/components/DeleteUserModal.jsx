import React, { useCallback, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/AuthModal.scss';
import axios from 'axios';

const DeleteUserModal = ({ handleDeleteUser, accessToken, handleLogout, handleCloseModal }) => {
  const history = useHistory();
  const [isDelete, setIsDelete] = useState(false);

  const moveToIntro = () => {
    history.push('/intro')

  }
  const withdrawRequestHandler = async () => {
    await axios.delete('http://localhost:4000/user/withdraw', {
      headers: {
        authorization: accessToken,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log('탈퇴 응답 : ', res);
      setIsDelete(true);
      localStorage.clear();
      handleDeleteUser(true);
      //handleLogout();
      setTimeout(moveToIntro, 2000);
    })
      .catch(err => console.log(err));
  }


  const handleNo = () => {
    handleCloseModal();
  }

  const domNode = useClickOutside(() => {
    handleCloseModal();
  })

  return (
    <div className="modal-container show-modal">
      {isDelete ? (
        <div ref={domNode} className="modal">
          <div className="modal-info">
            <div>
              정상적으로 계정이 삭제되었습니다.
            </div>
          </div>
        </div>
      ) :
        (
          <div ref={domNode} className="modal">
            <div className="modal-info">
              <div>
                탈퇴하시면 회원정보 복구가 불가능합니다. <br />
                정말 탈퇴하시겠습니까?
              </div>
              <div>
                <button onClick={withdrawRequestHandler}>네</button>
                <button onClick={handleNo}>아니오</button>
              </div>
            </div>
          </div>

        )}

    </div>
  );
}

export default withRouter(DeleteUserModal);