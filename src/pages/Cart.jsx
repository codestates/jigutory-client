import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/CartList.scss';
import CartList from '../components/CartList';
import OrderSummary from '../components/OrderSummary';

function Cart(accessToken, isLogin, userInfo, handleLogin) {
  const history = useHistory();
  const [cartList, setCartList] = useState([]);
  const [userinfo, setuserInfo] = useState('');
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userInfo');
    if (dataLocalStorage) {
      setuserInfo(JSON.parse(dataLocalStorage));
    }
  }, [setuserInfo]);

  // useEffect(() => {
  const initialCart = async () => {
    if (userinfo.email) {
      await axios
        .post(
          `http://localhost:4000/cart/read`,
          {
            email: userinfo.email,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          setCartList(res.data);
        });
    }
  };
  // });
  initialCart();

  return (
    <div className="cart-container">
      <div className="cart-component">
        {cartList.map((item, idx) => {
          const quantity = 1;
          return (
            <CartList
              isLogin={isLogin}
              cartList={cartList}
              total={total}
              quantity={quantity}
              handleLogin={handleLogin}
              item={item}
              key={idx}
            />
          );
        })}
      </div>
      <div className="cart-summary">
        <OrderSummary userinfo={userinfo} total={total} />
      </div>
    </div>
  );
}

export default Cart;
