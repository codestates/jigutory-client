import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';
import axios from 'axios';

const DeleteUserModal = ({ accessToken, handleCloseModal, isLogout }) => {
  const history = useHistory();
  const [isDelete, setIsDelete] = useState(false);

  const withdrawRequestHandler = () => {
    axios
      .delete('https://ec2-100-26-225-39.compute-1.amazonaws.com:80/user/withdraw', {
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log('탈퇴 응답 : ', res);
        isLogout();
        setIsDelete(true);
        //handleDeleteUser(true);
        setTimeout(() => { history.push('/intro') }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const handleNo = () => {
    handleCloseModal();
  };

  const domNode = useClickOutside(() => {
    handleCloseModal();
  });

  return (
    <div className="edituser-modal-container edituser-show-modal">
      {isDelete ? (
        <div ref={domNode} className="edituser-modal">
          <div className="modal-info">
            <div>정상적으로 계정이 삭제되었습니다.</div>
          </div>
        </div>

      ) : (
          <div ref={domNode} className="edituser-modal">

            <div className="edituser-modal-info">
              <div>
                탈퇴하시면 회원정보 복구가 불가능합니다. <br />
              정말 탈퇴하시겠습니까?
            </div>
              <div className="edituser_withdrawal_choose" >
                <button onClick={withdrawRequestHandler}>회원탈퇴</button>
                <button onClick={handleNo}>회원유지</button>
              </div>
            </div>
          </div>
        )}
    </div >
  );
};

export default withRouter(DeleteUserModal);
