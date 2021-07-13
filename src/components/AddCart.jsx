import React, { useCallback, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import useClickOutside from '../hooks/useClickOutside';
import '../styles/AuthModal.scss';
import axios from 'axios';

const AddCart = ({
  closeModal
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

  return (
    <div className="modal-container show-modal">
        <div className="modal">
          <div className="modal-info">
            <div>
              장바구니에 추가 되었습니다. <br />
              장바구니로 이동하시겠습니까?
            </div>
            <div>
              <button onClick={moveToCart}>장바구니로 이동</button>
              <button onClick={keepShopping}>계속 쇼핑하기</button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default withRouter(AddCart);
