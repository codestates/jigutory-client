import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { ScrollButton } from '../components/ScrollButton';
import '../styles/EditUser.scss';
import axios from 'axios';
axios.defaults.withCredentials = true;

//props App.jsx 설정하기
function Store({ handleLogin, accessToken, handleUserInfo, userInfo }) {
  const history = useHistory();
  const [productList, setList] = useState([]);
  const [isModalOn, setIsModalOn] = useState(false);
  const [message, setMessage] = useState('');
  console.log(`store.js product list 상태 :`, productList);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/product/list`,
        { email: userInfo.email },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        setList(res.data);
      });
  }, []);

  //장바구니에 아이템 추가
  const handleAdd = async (e) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/product/list`,
        { email: userInfo.email, productId: e },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(`thisisStore.js res data`, res.data.message);
        setIsModalOn(true);
        setMessage(res.data.message);
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    setIsModalOn(false);
  };

  return (
    <div className="store-container">
      {productList.map((item, idx) => (
        <ProductList
          handleLogin={handleLogin}
          handleUserInfo={handleUserInfo}
          setList={setList}
          productList={productList}
          closeModal={closeModal}
          userInfo={userInfo}
          message={message}
          isModalOn={isModalOn}
          item={item}
          key={idx}
          handleClick={() => handleAdd(item.id)}
        />
      ))}
      <ScrollButton />
    </div>
  );
}

export default Store;
