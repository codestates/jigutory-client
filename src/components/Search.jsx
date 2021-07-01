import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/Search.scss';

export const Search = ({ mapMovementRef, markerManageRef }) => {
  const [cafeList, setCafeList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResultList, setSearchResultList] = useState();

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

  const handleSearch = () => {
    if (!searchInput) {
      setSearchResultList();
      return;
    }

    const findOnName = cafeList.filter(({ name }) =>
      name.includes(searchInput),
    );

    // const findOnKeyword = cafeList.filter(({ keyword }) =>
    //   keyword.includes(searchInput),
    // );

    setSearchResultList([...findOnName]);
    // setSearchResultList([...findOnName, ...findOnKeyword]);
  };

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
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
      <div id="search-bar">
        <input
          value={searchInput}
          placeholder="카페명을 입력하세요!"
          onChange={handleChangeInput}
          onKeyPress={handleSearchEnter}
        />
        <button onClick={handleSearch}>
          <img
            alt="이미지 불러오기에 실패했습니다."
            src="https://img.icons8.com/material-outlined/24/000000/search--v1.png"
          />{' '}
        </button>
      </div>
      <hr />
      <div id="search-result-list">
        {searchResultList?.length === 0 && '검색 결과가 없습니다.'}
        {
          searchResultList ? (
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
          )
          // cafeList.map(({ id, name, latitude, longitude }) => (
          //     <div
          //       id="search-result-item"
          //       key={id}
          //       onClick={handleClickSearchResultItem(latitude, longitude)}
          //     >
          //       {name}
          //     </div>
          //   ))
        }
      </div>
    </div>
  );
};
