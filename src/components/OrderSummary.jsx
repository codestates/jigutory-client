import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function OrderSummary({ message }) {
  const [totalQuantitiy, setQuantitiy] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [userinfo, setuserInfo] = useState('');
  const [sum, setSum] = useState([]);

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
          `http://localhost:4000/cart/update`,
          {
            email: userinfo.email,
            quantitiy: 1,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => totalQuantitiy(1), totalSum(1));
    }
  }, []);

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
          let arr = res.data.findCount.rows;
          setSum(arr);
          calculate(arr);
        });
    }
  });

  function calculate(arr) {
    let total = {
      price: 0,
      quantity: 0,
    };
    for (let i = 0; i < arr.length; i++) {
      let quantity = arr[i].message;
      let price = arr[i].totalPrice;
      total.price += price;
      total.quantity = total.quantity + quantity;
    }

    setQuantitiy(total.quantity);
    setTotalSum(total.price);
    // console.log(`thisistotal`,total)
    return total;
  }

  return (
    <div id="order-summary-container">
      <h4>주문 합계</h4>
      <div id="order-summary">총 수량 : {totalQuantitiy} 개</div>
      <div id="order-summary-total">합계 : {totalSum} 원</div>
      <button >구매하기</button>
    </div>
  );
}
