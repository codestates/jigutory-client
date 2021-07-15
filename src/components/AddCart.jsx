import React, { useCallback, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/AddCart.scss';
// import '../styles/AuthModal.scss'
import axios from 'axios';
import Login from './Login'
import SignUp from './SignUp'

const AddCart = ({
  closeModal, message, accessToken, productList, handleLogin
}) => {
  const history = useHistory();
  const [isDelete, setIsDelete] = useState(false);
  
  const keepShopping = () => {
    closeModal()
    // history.push('/store');
    
  };

  const moveToCart = () => {
    history.push('/cart');
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
    console.log('로그인 모달창 열기');
  };

  const handleCloseLogin = () => {
    history.push('/store');
    console.log('로그인 모달창 닫기');
  };

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
    console.log('회원가입 모달창 열기');
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
    console.log('회원가입 모달창 닫기');
  };

  return (
<div>
    {!accessToken ? (
    <div className="modal-container show-modal-store">
      
    <div className="modal-store">
    <button className="modal-close-store" onClick={handleCloseLogin}>
          <i className="fas fa-times fa-lg"></i>
        </button>
      <div className="modal-info-store">
        <div>
        로그인 후 이용 가능합니다.
        </div>
      </div>
        <div >
          <button className="forbutton" onClick={handleOpenLogin}>로그인 하기</button>
          {isSignUpOpen && (<SignUp accessToken={accessToken} handleCloseSignUp={handleCloseSignUp} handleLogin={handleLogin}/>)}
          <button className="forbutton" onClick={handleOpenSignUp}>회원가입 하기</button>
          {isLoginOpen && (<Login handleLogin={handleLogin} handleCloseLogin={handleCloseLogin}/>)}
        </div>
    </div>
</div>
) : (
    <div className="modal-container show-modal-store">
        <div className="modal-store">
          <div className="modal-info-store">
            <div>
            {message} <br />
              장바구니로 이동하시겠습니까?
            </div>
            <div>
              <button onClick={moveToCart}>장바구니로 이동</button>
              <button onClick={keepShopping}>계속 쇼핑하기</button>
            </div>
          </div>
        </div>
    </div>
)
}
</div>
  )
}

export default withRouter(AddCart);
