import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Search.scss';

export const Search = ({ mapMovementRef, markerManageRef }) => {
  const [cafeList, setCafeList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResultList, setSearchResultList] = useState();
  const [category, setCategory] = useState();
  const [categoryInput, setCategoryInput] = useState(
    '카테고리를 선택한 후 검색어를 입력하세요!',
  );

  const fetchCafeList = async () => {
    const cafeListResponse = await axios.get(`http://localhost:4000/cafe/list`);
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
  };

  const handleSearch = () => {
    if (category === '카페명') {
      handleSearchOnName();
    } else if (category === '할인금액') {
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
    setCategoryInput('ex) 카페 OO');
  };

  const handleClickKeywordCategory = () => {
    setCategory('할인금액');
    setCategoryInput('ex) 300원 / 500원 / 50% 할인');
  };

  const handleClickTypeCategory = () => {
    setCategory('가게분류');
    setCategoryInput('ex) 카페 / 제로웨이스트샵 ');
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
            backgroundColor: category === '카페명' && 'rgba(8, 70, 99, 0.6)',
            color: category === '카페명' && 'rgba(255, 255, 255)',
          }}
          onClick={handleClickNameCategory}
        >
          카페명
        </button>
        <button
          id="search-category-keyword"
          style={{
            backgroundColor: category === '할인금액' && 'rgba(8, 70, 99, 0.6)',
            color: category === '할인금액' && 'rgba(255, 255, 255)',
          }}
          onClick={handleClickKeywordCategory}
        >
          할인금액
        </button>
        <button
          id="search-category-keyword"
          style={{
            backgroundColor: category === '가게분류' && 'rgba(8, 70, 99, 0.6)',
            color: category === '가게분류' && 'rgba(255, 255, 255)',
          }}
          onClick={handleClickTypeCategory}
        >
          가게분류
        </button>
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
          <i className="fas fa-search"></i>
        </button>
      </div>
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
