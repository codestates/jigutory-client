import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function OrderSummary({ message }) {
  const [totalQuantitiy, setQuantitiy] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [userinfo, setuserInfo] = useState('');
  const [sum, setSum] = useState([]);
  const [buying, cantBuy] = useState('')
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEmpty, setIsEmpty] = useState('π μ₯λ°κ΅¬λμ λ΄κΈ΄ μνμ΄ μμ΅λλ€.');

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
    const total = {
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
    if (totalSum !== 0) {
      setIsEmpty('');
    }
    return total;
  }

  const handleOrder = () => {
    cantBuy('π  κ°λ° μ€μΈ κΈ°λ₯μλλ€');
    setTimeout(() => cantBuy(''), 2000);
    console.log('clickBuy');
  };

  return (
    <div id="order-summary-container">
      <h4>μ£Όλ¬Έ ν©κ³</h4>
      <div id="order-summary">μ΄ μλ : {totalQuantitiy} κ°</div>
      <div id="order-summary-total">ν©κ³ : {totalSum} μ</div>
      <button onClick={handleOrder}>κ΅¬λ§€νκΈ°</button>
      <div className="order-summary-buying">{buying}</div>
      <div className="order-summary-buying">{isEmpty}</div>
    </div>
  );
}