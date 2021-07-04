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

  const handleSearch = () => {
    if (category === '카페명') {
      console.log('category:', '카페명');
      handleSearchOnName();
    } else if (category === '키워드') {
      console.log('category:', '키워드');
      handleSearchOnKeyword();
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
    setCategory('키워드');
    setCategoryInput('키워드를 입력하세요.');
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

  return (
    <div id="search">
      <div id="search-category">
        <button
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
        </button>
        {/* <button>???</button> */}
      </div>
      <div id="search-bar">
        <input
          value={searchInput}
          placeholder={categoryInput}
          onChange={handleChangeInput}
          onKeyPress={handleSearchEnter}
          disabled={!category}
        />
        <button onClick={handleSearch}>
          <img
            alt="검색"
            src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
          />
        </button>
      </div>
      <hr />
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
