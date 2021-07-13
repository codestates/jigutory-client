import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import '../styles/EditUser.scss';
import axios from 'axios';
import ProductList from '../components/ProductList';
axios.defaults.withCredentials = true;

//props App.jsx 설정하기
function Store({ accessToken, userInfo }) {
  const history = useHistory();
  const [productList, setList] = useState([]);
  const [isModalOn, setIsModalOn] = useState(false);
  console.log(`store.js product list 상태 :`, productList);

  useEffect(() => {
    axios
      .post(
        'http://localhost:4000/product/list',
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

  const handleAdd = async (e) => {
    console.log(e);
    await axios
      .post(
        'http://localhost:4000/product/list',
        { email: userInfo.email, productId: e },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        console.log(`thisisStore.js res data`, res);
        setIsModalOn(true);
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
          closeModal={closeModal}
          userInfo={userInfo}
          isModalOn={isModalOn}
          item={item}
          key={idx}
          handleClick={() => handleAdd(item.id)}
        />
      ))}
    </div>
  );
}

export default Store;
