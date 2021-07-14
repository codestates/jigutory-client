import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function CartList({ 
  total, setTotal, handleQuantityChange, removeFromCart, quantity, checkedItems, handleCheckChange, item , handleClick, isModalOn , closeModal }) {
  // console.log(checkedItems)
  const [userinfo, setuserInfo] = useState('')
  const [change, setChange] = useState(0)
  const [quantitiy, setQuantitiy] = useState('')
  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userInfo')
    if(dataLocalStorage){
      setuserInfo(JSON.parse(dataLocalStorage))
    }
  },[setuserInfo])

  const handleTotal = (quantitiy, itemid, price) =>{
   console.log(`thisisquantitiy`, quantitiy)
   console.log(`thisisitemid`, itemid)
   axios.post('http://localhost:4000/cart/update',{
     email:userinfo.email, quantitiy:quantitiy, id:itemid, price:price*quantitiy
  },{
    headers:{
      'Content-Type': 'application/json'
    }
   }).then((res)=>
   console.log(`thisis patch res`, res.data))
  }

  useEffect (() => {
    if(userinfo.email){
    axios.post('http://localhost:4000/cart/count',{
      email:userinfo.email
    },{
      headers: {
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      console.log(`thisisres.data`, res.data.findCount.rows)
      // setQuantitiy(res)
    })
  }
})

  //아이템 삭제 기능
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
      {/* <input type="text"  className="cartitem-quantity" min ={1} placeholder={'수량입력'} 
      onChange={(e) => {
        handleTotal((e.target.value), item.id, item.price)
      }}> */}
        {/* </input> */}
        <select onChange={(e)=>{handleTotal((e.target.value), item.id, item.price)}}>
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
<div id='result'></div>
      <button onClick={()=> { deleteItem(item.id)}}
      className="cartitem-delete">Delete</button>
      </div>
    </div>
    </div>
  )
}
