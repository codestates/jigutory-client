import React from 'react'
export default function CartList({ userInfo, item , handleClick, isModalOn , closeModal }) {

  return (
    <div className="cart-item">
     
    <div key={item.id} className="cartitem-List">
    <input type="checkbox"></input>
      <div className="cartitem-thumbnail">
      <img className="cartitem-img" src={item.image} alt={item.name}></img>
      </div>

      <div className="cartitem-info">
      <div className="cartitem-price">{item.name}</div>
      <div className="cartitem-price">{item.price}원</div>
      <input type="number" min={1} className="cartitem-quantity" value={1}></input>
    <button className="cartitem-delete">Delete</button>
      </div>

    </div>
    
    </div>
  )
}
