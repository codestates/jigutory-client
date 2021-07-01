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

    const findOnKeyword = cafeList.filter(({ keyword }) =>
      keyword.includes(searchInput),
    );
    setSearchResultList([...findOnName, ...findOnKeyword]);
  };

  useEffect(() => {
    fetchCafeList();
  }, []);

  useEffect(() => {
    if (!markerManageRef) {
      return;
    }
    cafeList.forEach(({ latitude, longitude, id }) => {
      markerManageRef.current.addMarker(latitude, longitude, id);
    });
  }, [cafeList, markerManageRef]);

  return (
    <div id="search">
      <div id="search-bar">
        <input value={searchInput} onChange={handleChangeInput} />
        <button onClick={handleSearch}>검색</button>
      </div>
      <hr />
      <div id="search-result-list">
        {searchResultList?.length === 0 && '검색 결과가 없습니다.'}
        {searchResultList
          ? searchResultList.map(({ id, name, latitude, longitude }) => (
              <div
                id="search-result-item"
                key={id}
                onClick={handleClickSearchResultItem(latitude, longitude)}
              >
                {name}
              </div>
            ))
          : cafeList.map(({ id, name, latitude, longitude }) => (
              <div
                id="search-result-item"
                key={id}
                onClick={handleClickSearchResultItem(latitude, longitude)}
              >
                {name}
              </div>
            ))}
      </div>
    </div>
  );
};
