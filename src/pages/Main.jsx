import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Map.scss';

const { kakao } = window;

function Map() {
  const [LatLng, setLatLng] = useState([37.51040624439627, 127.05862531328155]);
  const [map, setMap] = useState({});
  const [mapLevel, setMapLevel] = useState(3);
  const [dataMarker, setDataMarker] = useState([]);
  const [dataMarkerList, setDataMarkerList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchMarker, setSearchMarker] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchLatLng, setSearchLatLng] = useState([
    37.51040624439627, 127.05862531328155,
  ]);

  useEffect(() => {
    kakao.maps.load(() => {
      loadKakaoMap();
    });
  }, []);

  const loadKakaoMap = () => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(LatLng[0], LatLng[1]), //지도의 중심좌표
      level: mapLevel, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 & 객체 리턴

    const mapTypeControl = new kakao.maps.MapTypeControl(); // 일반 지도, 스카이뷰
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new kakao.maps.ZoomControl(); // 확대, 축소
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setMap(map);
  };

  // DB에 저장된 카페들
  useEffect(() => {
    axios
      .get(`https://localhost:4000/cafe/list`)
      .then((res) => console.log(res.data))
      .then((body) => {
        setDataMarkerList(body);
      })
      .catch((err) => console.error(err));
  }, []);

  const viewMarkers = () => {
    deleteMarkers();
    const markers = [];
    for (let i = 0; i < dataMarkerList.length; i++) {
      const position = new kakao.maps.LatLng(
        dataMarkerList[i].latitude,
        dataMarkerList[i].longtitude,
      );

      const markerImage = new kakao.maps.MarkerImage(
        `/images/marker/theme0.png`,
        new kakao.maps.Size(48, 59),
        { offset: new kakao.maps.Point(20, 50) },
      );

      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        image: markerImage,
      });

      const iwContent = `<div class="markerInfo">${dataMarkerList[i].name}</div>`;

      const infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        zIndex: 999,
      });

      kakao.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
      });

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });

      marker.setMap(map);
      markers.push(marker);
    }
    setDataMarker(markers);
  };

  useEffect(() => {
    viewMarkers();
  }, []);

  const deleteMarkers = () => {
    for (let i = 0; i < dataMarker.length; i++) {
      dataMarker[i].setMap(null);
    }
  };

  // 검색 요청
  useEffect(() => {
    setSearchMode(true);
    if (searchInput !== '' && searchMode) {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchInput}&y=${LatLng[0]}&x=${LatLng[1]}&sort=distance`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_REST_API}`,
            },
          },
        )
        .then((body) => {
          const newSearchList = [];
          body.documents.map((places) => {
            newSearchList.push({
              place_name: places.place_name,
              address_name: places.address_name,
            });
          });
          setSearchList(newSearchList);
          setSearchLatLng([body.documents[0].y, body.documents[0].x]);
        })
        .catch((err) => console.log(err));
    }
  }, [LatLng, searchInput, searchMode]);

  // 검색 입력
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (map) {
      viewSearchMarkers();
    }
  });

  const viewSearchMarkers = () => {
    if (searchMarker.length > 0) {
      deleteSearchMarkers();
    }
  };

  const deleteSearchMarkers = () => {
    for (let i = 0; i < searchMarker.length; i++) {
      searchMarker[i].setMap(null);
    }
  };

  const handleSearchList = () => {
    handleSearchLatLng(searchLatLng[0], searchLatLng[1]);
    setSearchList([]);
    setSearchInput(searchInput);
  };

  // 검색해서 클릭하면 지도 위치 변경
  const handleSearchLatLng = (latitude, longtitude) => {
    const moveLatLng = new kakao.maps.LatLng(latitude, longtitude);
    map.panTo(moveLatLng);
    setLatLng([latitude, longtitude]);
  };

  // Enter 버튼 눌렀을 때 검색
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      setSearchMode(false);
      handleSearchList();
    }
  };

  // 검색 목록에서 클릭
  const handleSearchListClick = (places) => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${places}&y=${LatLng[0]}&x=${LatLng[1]}&sort=distance`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_MAP_REST_API}`,
          },
        },
      )
      .then((body) => {
        setSearchLatLng([body.documents[0].y, body.documents[0].x]);
        handleSearchLatLng(body.documents[0].y, body.documents[0].x);
      })
      .catch((err) => console.log(err));
    setSearchInput(places);
    setSearchList([]);
    setSearchMode(false);
  };

  return (
    <div className="search">
      <div className="search-location">
        <input
          id="keyword"
          type="text"
          placeholder="카페명 검색"
          value={searchInput}
          onChange={handleSearchInput}
          onKeyPress={handleSearchEnter}
        ></input>
        <button onClick={handleSearchList}>검색</button>
      </div>
      {searchList.length !== 0 ? (
        <ul>
          {searchList.map((places, idx) => {
            return (
              <li
                key={idx}
                onClick={() => handleSearchListClick(places.place_name)}
              >
                <div className="place_name">{places.place_name}</div>
                <div className="address_name">{places.address_name}</div>
              </li>
            );
          })}
        </ul>
      ) : (
        <></>
      )}
      <div id="map" style={{ width: '700px', height: '700px' }}></div>
    </div>
  );
}

export default Map;
