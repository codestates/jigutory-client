import React from 'react'
import '../styles/ProductList.scss'
import AddCart from './AddCart';
export default function Item({ userInfo, item , handleClick, isModalOn , closeModal }) {

  return (
    <div className="Store-item">
    <div key={item.id} className="item-List">
      <div className="item-name">{item.name}</div>
      <img className="item-img" src={item.image} alt={item.name}></img>
      <figcaption>
      <div className="item-description">{item.description}</div>
      <div className="item-price">{item.price}원</div>
      <button className="item-button" onClick={(e) => handleClick(e, item.id)}> 장바구니 담기</button>
      <section>
        {isModalOn &&(
          <AddCart userInfo={userInfo} closeModal={closeModal}/>
        )}
      </section>
      </figcaption>
    </div>
    </div>
  )
}