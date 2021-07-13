import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function CartList({ 
  total, setTotal, handleQuantityChange, removeFromCart, quantity, checkedItems, handleCheckChange, item , handleClick, isModalOn , closeModal }) {
  // console.log(checkedItems)
  const [userinfo, setuserInfo] = useState('')

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userInfo')
    if(dataLocalStorage){
      setuserInfo(JSON.parse(dataLocalStorage))
    }
  },[setuserInfo])

  const handleTotal = (quantitiy, itemid) =>{
    handleQuantityChange(itemid,quantitiy)
    
    console.log(`thisistotal`, itemid)
  }

  const deleteItem = (id) =>{
  axios.delete('http://localhost:4000/cart/delete',{
    email:userinfo.email, id:id
  },
  {
    headers : {
      'Content-Type': 'application/json'
    },
  })
  .then((res)=>
  console.log('삭제 응답', res))
}

  return (
    <div className="cart-item">
    <div key={item.id} className="cartitem-List">
    {/* <input type="checkbox" onChange={(e)=>{
      handleCheckChange(e.target.checked, item.id)
    }}
    checked={checkedItems.includes(item.id) ? true : false}></input> */}
      <div className="cartitem-thumbnail">
      <img className="cartitem-img" src={item.image} alt={item.name}></img>
      </div>

      <div className="cartitem-info">
      <div className="cartitem-price">{item.name}</div>
      <div className="cartitem-price">{item.price}원</div>
      <input type="number"  className="cartitem-quantity" min ={1} placeholder={'수량선택'}
      onChange={(e) => {
        handleTotal(Number(e.target.value), item.id,)
      }}>
        </input>
      <button onClick={()=> { deleteItem(item.id)}}
      className="cartitem-delete">Delete</button>
      </div>
    </div>
    
    </div>
  )
}
