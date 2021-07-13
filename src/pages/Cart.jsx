import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/CartList.scss';
import CartList from '../components/CartList'

function Cart(accessToken, userInfo) {
  const history = useHistory();
  const [cartList, setCartList] = useState([])
  const [userinfo, setuserInfo] = useState('')
  const total = 0
  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userInfo')
    if(dataLocalStorage){
      setuserInfo(JSON.parse(dataLocalStorage))
    }
  },[setuserInfo])

  useEffect(()=>{
    if(userinfo.email){
      axios.post('http://localhost:4000/cart/read',{
        email:userinfo.email
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
    }
  ).then((res)=>{
    setCartList(res.data)
  })
}})



  return (
  <div className="cart-container">
    {cartList.map((item,idx)=>
    <CartList item={item} key ={idx} />)}
    {<div>{total}</div>}
    <button>구매하기</button>
    </div>)
}

export default Cart;
