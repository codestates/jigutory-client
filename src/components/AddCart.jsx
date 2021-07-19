import React, { useCallback, useState, useEffect } from 'react';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/AddCart.scss';
// import '../styles/AuthModal.scss'
import axios from 'axios';
import Login from './Login'
import SignUp from './SignUp'

const AddCart = ({
  closeModal, message, accessToken, productList, handleLogin, handleUserInfo, isLogin,
}) => {
  const history = useHistory();
  const [isDelete, setIsDelete] = useState(false);
  const [userinfo, setuserInfo] = useState('');

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userInfo');
    if (dataLocalStorage) {
      setuserInfo(JSON.parse(dataLocalStorage));
    }
  }, [setuserInfo]);

  const keepShopping = () => {
    closeModal()
  };

  const moveToCart = () => {
    history.push('/cart')
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    console.log('로그인 모달창 열기');
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    closeModal()
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
    // window.location.replace("/store")
    history.push('/store');
  };

  // const domNode = useClickOutside(() => {
  //   handleCloseLogin();
  // });

  return (
    <div>
      {!userinfo.username ? (
        <div className="modal-container show-modal-store">

          <div className="modal-store">
            <button className="modal-close-store" onClick={handleCloseLogin}>
              <i className="fas fa-times fa-lg"></i>
            </button>
            <div className="modal-info-store">
              로그인 후 이용 가능합니다.
      </div>
            {/* <div >
          <button className="forbutton" onClick={handleOpenLogin}>로그인 하기</button>
          {isLoginOpen && (<Login accessToken={accessToken} handleCloseLogin={handleCloseLogin} handleUserInfo={handleUserInfo} handleLogin={handleLogin}/>)}
          <button className="forbutton" onClick={handleOpenSignUp}>회원가입 하기</button>
          {isSignUpOpen&& (<SignUp handleCloseSignUp={handleCloseSignUp} handleUserInfo={handleUserInfo} />)}
        </div> */}
          </div>
        </div>
      ) : (
          <div className="addcart_modal-container addcart_show-modal">
            <div className="addcart_modal">
              <div className="addcart_modal-info ">
                <div>
                  {message} <br />
              장바구니로 이동하시겠습니까?
            </div>
                <div>
                  <button className="forbutton" onClick={moveToCart}>장바구니 이동</button>
                  <button className="forbutton" onClick={keepShopping}>계속 쇼핑하기</button>
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