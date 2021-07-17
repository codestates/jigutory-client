import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/CartList.scss';

import { ScrollButton } from '../components/ScrollButton';

export default function CartList({
  cartList,
  isLogin,
  productList,
  setList,
  total,
  setTotal,
  handleQuantityChange,
  removeFromCart,
  quantity,
  checkedItems,
  handleCheckChange,
  item,
  handleClick,
  isModalOn,
  closeModal,
}) {
  const [userinfo, setuserInfo] = useState('');
  const [change, setChange] = useState(0);
  const [quantitiy, setQuantitiy] = useState('');
  const history = useHistory();
  console.log(`thisiscartlist`, cartList)
  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userInfo');
    if (dataLocalStorage) {
      setuserInfo(JSON.parse(dataLocalStorage));
    }
  }, [setuserInfo]);

  const handleTotal = (quantitiy, itemid, price) => {
    console.log(`thisisquantitiy`, quantitiy);
    console.log(`thisisitemid`, itemid);
    axios
      .post(
        `http://localhost:4000/cart/update`,
        {
          email: userinfo.email,
          quantitiy: quantitiy,
          id: itemid,
          price: price * quantitiy,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => console.log(`thisis patch res`, res.data));
  };

  useEffect(() => {
    if (userinfo.email) {
      axios
        .post(
          `http://localhost:4000/cart/count`,
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
          axios
            .post(
              `http://localhost:4000/product/list`,
              { email: userinfo.email },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            )
            .then((res) => {
              console.log(res);
            });
        });
    }
  }, []);

  //아이템 삭제 기능
  const deleteItem = (id) => {
    axios.delete(
      `http://localhost:4000/cart/delete`,
      {
        data: {
          email: userinfo.email,
          productid: id,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
        },
      },
    ).then((res) => {
      alert('장바구니에서 삭제 되었습니다.')
      window.location.replace("/cart")
    })

  };

  return (
    // <div className="cart-item">
    <div key={item.id} className="cartitem-List">
      {cartList.length === 0 ? (
        <div>장바구니에 아이템이 없습니다.</div>
      ) : (
          <>
            <div className="cartitem-thumbnail">
              <img className="cartitem-img" src={item.image} alt={item.name}></img>
            </div>
            <div className="cart-content">
              <span className="cartitem-name">{item.name}</span>
              <div className="cartitem-info">
                <span className="cartitem-price">{item.price}원</span>
                <select
                  onChange={(e) => {
                    handleTotal(e.target.value, item.id, item.price);
                  }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button
                  onClick={() => { deleteItem(item.id) }}
                  id="cartitem-delete"
                >
                  Delete
          </button>
              </div>
            </div>
          </>
        )}
      <ScrollButton />
    </div>
  );
}