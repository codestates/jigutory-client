import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Search.scss';

export const Search = ({ mapMovementRef, markerManageRef }) => {
  const [cafeList, setCafeList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResultList, setSearchResultList] = useState();
  const [category, setCategory] = useState();
  const [categoryInput, setCategoryInput] = useState('카테고리를 선택하세요!');

  const fetchCafeList = async () => {
    const cafeListResponse = await axios.get('http://localhost:4000/cafe/list');
    setCafeList(cafeListResponse.data);
  };

  const handleClickSearchResultItem = (lat, lng) => () => {
    mapMovementRef.current.move(lat, lng);
  };

  const handleChangeInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchOnName = () => {
    if (!searchInput) {
      setSearchResultList();
      return;
    }
    const findOnName = cafeList.filter(({ name }) =>
      name.includes(searchInput),
    );
    setSearchResultList([...findOnName]);
  };

  const handleSearchOnKeyword = () => {
    if (!searchInput) {
      setSearchResultList();
      return;
    }
    const findOnKeyword = cafeList.filter(({ keyword }) =>
      keyword.includes(searchInput),
    );
    setSearchResultList([...findOnKeyword]);
  };

  const handleSearchOnType = () => {
    if (!searchInput) {
      setSearchResultList();
      return;
    }
    const findOnType = cafeList.filter(({ type }) =>
      type.includes(searchInput),
    );
    setSearchResultList([...findOnType]);
  }

  const handleSearch = () => {
    if (category === '카페명') {
      console.log('category:', '카페명');
      handleSearchOnName();
    } else if (category === '할인금액') {
      console.log('category:', '할인금액');
      handleSearchOnKeyword();
    } else if (category === '가게분류') {
      handleSearchOnType();
    }
  };

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickNameCategory = () => {
    setCategory('카페명');
    setCategoryInput('카페명을 입력하세요.');
  };

  const handleClickKeywordCategory = () => {
    setCategory('할인금액');
    setCategoryInput('할인금액 입력하세요.');
  };

  const handleClickTypeCategory = () => {
    setCategory('가게분류');
    setCategoryInput('가게분류 입력하세요.');
  };

  useEffect(() => {
    fetchCafeList();
  }, []);

  useEffect(() => {
    if (!markerManageRef) {
      return;
    }
    cafeList.forEach(({ latitude, longitude, id, name }) => {
      markerManageRef.current.addMarker(latitude, longitude, id, name);
    });
  }, [cafeList, markerManageRef]);

  function handleChooseTag(e) {
    e.preventDefault();
    setCategoryInput(e.target.value);
  }

  // 인풋 초기화 함수
  // function handleReset() {
  //   setImgUrl(initialImg)
  //   setContent('')
  //   console.log('초기화 중입니다.')
  // }

  return (
    <div id="search">
      <div id="search-category">
        <select onClick={handleChooseTag}>
          <option value="">카테고리를 선택하세요</option>
          <option onChange={handleClickNameCategory} value={categoryInput}>카페명</option>
          <option onChange={handleClickKeywordCategory} value="1">할인금액</option>
          <option onChange={handleClickTypeCategory} value="2">가게분류</option>
        </select>
        {/* <button
          id="search-category-name"
          style={{
            backgroundColor: category === '카페명' && 'rgba(8, 70, 99, 0.7)',
          }}
          onClick={handleClickNameCategory}
        >
          카페명
        </button>
        <button
          id="search-category-keyword"
          style={{
            backgroundColor: category === '키워드' && 'rgba(8, 70, 99, 0.7)',
          }}
          onClick={handleClickKeywordCategory}
        >
          키워드
        </button> */}
      </div>
      <div id="search-bar">
        <input
          className="search-bar-input"
          value={searchInput}
          placeholder={categoryInput}
          onChange={handleChangeInput}
          onKeyPress={handleSearchEnter}
          disabled={!category}
        />
        <button onClick={handleSearch}>
          <i className="fas fa-search" ></i>
          {/* <img
            alt="이미지 불러오기에 실패했습니다."
            src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
          /> */}
        </button>
      </div>
      {/* <hr /> */}
      <div id="search-result-list">
        {searchResultList?.length === 0 && '검색 결과가 없습니다.'}
        {searchResultList ? (
          searchResultList.map(({ id, name, latitude, longitude }) => (
            <div
              id="search-result-item"
              key={id}
              onClick={handleClickSearchResultItem(latitude, longitude)}
            >
              {name}
            </div>
          ))
        ) : (
            <></>
          )}
      </div>
    </div>
  );
};
