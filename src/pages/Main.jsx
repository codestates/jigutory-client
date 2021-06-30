// import React, { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/Map.scss';

// const Main = () => {
//   const [map, setMap] = useState({});

//   const loadKakaoMap = useCallback(() => {
//     const mapContainer = document.getElementById('map');
//     const mapOption = {
//       center: new window.kakao.maps.LatLng(
//         37.51040624439627,
//         127.05862531328155,
//       ),
//       level: 3,
//     };
//     const map = new window.kakao.maps.Map(mapContainer, mapOption);

//     const mapTypeControl = new window.kakao.maps.MapTypeControl();
//     map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

//     const zoomControl = new window.kakao.maps.ZoomControl();
//     map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

//     setMap(map);
//   }, []);

//   useEffect(() => {
//     window.kakao.maps.load(() => {
//       loadKakaoMap();
//     });
//   }, [loadKakaoMap]);

//   useEffect(() => {
//     const ps = new window.kakao.maps.services.Places();
//     const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

//     const markerList = [];
//     const searchPlaces = () => {
//       const keyword = document.getElementById('keyword').value;
//       ps.keywordSearch(keyword, )
//     };
//   });

//   return (
//     <>
//       <div
//         id="map"
//         style={{ margin: '1rem 0 0 0', width: '100%', height: '600px' }}
//       ></div>
//     </>
//   );
// };

// export default Main;

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Map.scss';

function Map() {
  const [LatLng, setLatLng] = useState([37.51040624439627, 127.05862531328155]);
  const [map, setMap] = useState({});
  const [mapLevel, setMapLevel] = useState(3);
  const [dataMarker, setDataMarker] = useState([]);
  const [markerList, setMarkerList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchLatLng, setSearchLatLng] = useState([
    37.51040624439627, 127.05862531328155,
  ]);

  const loadKakaoMap = useCallback(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(LatLng[0], LatLng[1]),
      level: mapLevel,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    setMap(map);
  }, []);

  useEffect(() => {
    window.kakao.maps.load(() => {
      loadKakaoMap();
    });
  }, [loadKakaoMap]);

  // // DB에 저장된 카페들
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/cafe/list`)
  //     .then((res) => console.log(res.data))
  //     .then((body) => {
  //       setDataMarkerList(body);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // const viewMarkers = () => {
  //   deleteMarkers();
  //   const markers = [];
  //   for (let i = 0; i < dataMarkerList.length; i++) {
  //     const position = new kakao.maps.LatLng(
  //       dataMarkerList[i].latitude,
  //       dataMarkerList[i].longtitude,
  //     );

  //     const markerImage = new kakao.maps.MarkerImage(
  //       `/images/marker/theme0.png`,
  //       new kakao.maps.Size(48, 59),
  //       { offset: new kakao.maps.Point(20, 50) },
  //     );

  //     const marker = new kakao.maps.Marker({
  //       map: map,
  //       position: position,
  //       image: markerImage,
  //     });

  //     const iwContent = `<div class="markerInfo">${dataMarkerList[i].name}</div>`;

  //     const infowindow = new kakao.maps.InfoWindow({
  //       content: iwContent,
  //       zIndex: 999,
  //     });

  //     kakao.maps.event.addListener(marker, 'mouseover', function () {
  //       infowindow.open(map, marker);
  //     });

  //     kakao.maps.event.addListener(marker, 'mouseout', function () {
  //       infowindow.close();
  //     });

  //     marker.setMap(map);
  //     markers.push(marker);
  //   }
  //   setDataMarker(markers);
  // };

  // useEffect(() => {
  //   viewMarkers();
  // }, []);

  // const deleteMarkers = () => {
  //   for (let i = 0; i < dataMarker.length; i++) {
  //     dataMarker[i].setMap(null);
  //   }
  // };

  // 검색 입력
  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }

  useEffect(() => {
    var markers = [];
    var ps = new window.kakao.maps.services.Places();
    var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
    searchPlaces();
    function searchPlaces() {
      var keyword = document.getElementById('keyword').value;

      ps.keywordSearch(keyword, placesSearchCB);
    }

    function placesSearchCB(data, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(data);
      }
    }

    function displayPlaces(places) {
      const listEl = document.getElementById('placesList');
      const menuEl = document.getElementById('menu_wrap');
      const fragment = document.createDocumentFragment();
      const bounds = new window.kakao.maps.LatLngBounds();
      removeAllChildNods(listEl);

      removeMarker();

      for (var i = 0; i < places.length; i++) {
        var placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x,
          ),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfowindow(marker, title);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            infowindow.close();
          });

          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수입니다
    function getListItem(index, places) {
      var el = document.createElement('li'),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          '   <h5>' +
          places.place_name +
          '</h5>';

      if (places.road_address_name) {
        itemStr +=
          '    <span>' +
          places.road_address_name +
          '</span>' +
          '   <span class="jibun gray">' +
          places.address_name +
          '</span>';
      } else {
        itemStr += '    <span>' + places.address_name + '</span>';
      }

      itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx, title) {
      var imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions,
        ),
        marker = new window.kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    function displayInfowindow(marker, title) {
      var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  });

  // 검색 요청
  useEffect(() => {
    if (!searchInput) {
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
  }, [LatLng, searchInput]);

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
  };

  const handleSearchList = () => {
    handleSearchLatLng(searchLatLng[0], searchLatLng[1]);
    setSearchList([]);
    setSearchInput(searchInput);
  };

  // Enter 버튼 눌렀을 때 검색
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearchList();
    }
  };

  // 검색해서 클릭하면 지도 위치 변경
  const handleSearchLatLng = (latitude, longtitude) => {
    const moveLatLng = new window.kakao.maps.LatLng(latitude, longtitude);
    map.panTo(moveLatLng);
    setLatLng([latitude, longtitude]);
  };

  return (
    <div class="map_wrap">
      <div
        id="map"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      ></div>

      <div id="menu_wrap" class="bg_white">
        <div class="option">
          <div>
            <form onSubmit="searchPlaces(); return false;">
              이름 :{' '}
              <input
                type="text"
                placeholder="검색"
                value={searchInput}
                onKeyPress={handleSearchEnter}
                onChange={handleSearchInput}
                id="keyword"
                size="15"
              />
              <button onClick={handleSearchList}>검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
}

export default Map;
