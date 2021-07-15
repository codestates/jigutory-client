import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/CartList.scss';
import CartList from '../components/CartList';
import OrderSummary from '../components/OrderSummary';

function Cart(accessToken, userInfo, handleLogin) {
  const history = useHistory();
  const [cartList, setCartList] = useState([]);
  const [userinfo, setuserInfo] = useState('');
  const [checkedItems, setCheckedItems] = useState(
    cartList.map((el) => el.itemId),
  );
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userInfo');
    if (dataLocalStorage) {
      setuserInfo(JSON.parse(dataLocalStorage));
    }
  }, [setuserInfo]);

  useEffect(() => {
    if (userinfo.email) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/cart/read`,
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
  });

  // const handleCheckChange = (checked, id) => {
  //   if (checked) {
  //     setCheckedItems([{...checkedItems, id}]);
  //   }
  //   else {
  //     setCheckedItems(checkedItems.filter((el) => el !== id));
  //   }
  // };

  // const handleAllCheck = (checked) => {
  //   if (checked) {
  //     setCheckedItems(cartList.map((el) => el.itemId))
  //   }
  //   else {
  //     setCheckedItems([]);
  //   }
  // };
  //   const sum = {}
  //   const onQuantityChange = (itemId, quantity) => {
  //     console.log(`thisiscartList`, cartList)
  //     const found = cartList.filter((el) => el.id == itemId)
  //     const idx = cartList.indexOf(found)
  //     console.log(sum)
  //     const cartItem = {
  //       itemId,
  //       quantity
  //     }

  //     setCartList([
  //       ...cartList.slice(0, idx),
  //       cartItem,
  //       ...cartList.slice(idx + 1)
  //     ])
  //   }
  // const handleQuantityChange = (quantity, itemId) => {
  //   onQuantityChange(itemId, quantity)
  // }

  // const getTotal = () => {
  //   let cartIdArr = cartList.map((el) => el.itemId)
  //   let total = {
  //     price: 0,
  //     quantity: 0,
  //   }
  //   for (let i = 0; i < cartIdArr.length; i++) {
  //     if (checkedItems.indexOf(cartIdArr[i]) > -1) {
  //       let quantity = cartList[i]
  //       let price = cartList.filter((el) => el.id === cartList[i].itemId)[0].price

  //       total.price = total.price + quantity * price
  //       total.quantity = total.quantity + quantity
  //     }
  //   }
  //   return total
  // }

  // const sumtotal = getTotal()

  const removeFromCart = (itemId) => {
    setCartList(cartList.filter((el) => el.itemId !== itemId));
  };
  return (
    <div className="cart-container">
      {/* <span id="shopping-cart-select-all">
          <input
            type="checkbox"
            checked={
              checkedItems.length === cartList.length ? true : false
            }
            onChange={(e) => handleAllCheck(e.target.checked)} >
          </input>
          <label >전체선택</label>
        </span> */}
      {cartList.map((item, idx) => {
        const quantity = 1;
        // console.log(`thisiscartList`, cartList)
        return (
          <CartList
            total={total}
            quantity={quantity}
            checkedItems={checkedItems}
            handleLogin={handleLogin}
            item={item}
            key={idx}
          />
        );
      })}
      <OrderSummary userinfo={userinfo} total={total} />
    </div>
  );
}

export default Cart;
