// import React, { useEffect } from 'react';
// import '../styles/Map.scss';

// const { kakao } = window;

// function Map() {
//   useEffect(() => {
//     const mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//     const mapOption = {
//       //지도를 생성할 때 필요한 기본 옵션
//       center: new kakao.maps.LatLng(37.51040624439627, 127.05862531328155), //지도의 중심좌표.
//       level: 3, //지도의 레벨(확대, 축소 정도)
//     };
//     const map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴

//     // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤 생성
//     const mapTypeControl = new kakao.maps.MapTypeControl();

//     // 지도에 컨트롤을 추가해야 지도위에 표시됨.
//     // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
//     map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//     // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
//     const zoomControl = new kakao.maps.ZoomControl();
//     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//     // 지도에 마커 표시 + 간단한 정보 표시
//     // forEach 사용하여 데이터베이스에서 여러개의 오버레이로 받아오기 가능 ??
//     const latlng = new kakao.maps.LatLng(37.497079, 127.023495);

//     const marker = new kakao.maps.Marker({
//       map: map,
//       position: latlng,
//     });

//     // 커스텀 오버레이에 표시할 컨텐츠
//     const content = document.createElement('div');
//     const info = document.createElement('div');
//     const title = document.createElement('div');
//     const closeBtn = document.createElement('button');
//     const body = document.createElement('div');
//     const imgbox = document.createElement('div');
//     const img = document.createElement('img');
//     const desc = document.createElement('div');
//     const address = document.createElement('div');
//     const discountInfo = document.createElement('div');
//     const link = document.createElement('a');
//     const detailBtn = document.createElement('button');

//     title.append(closeBtn);
//     imgbox.append(img);
//     desc.append(address, discountInfo, link, detailBtn);
//     body.append(imgbox, desc);
//     info.append(title, body, closeBtn);
//     content.append(info);

//     title.textContent = '덕분애';
//     address.textContent = '서울특별시 서초구 서초동 1315';
//     discountInfo.innerHTML = '텀블러 500원 할인';
//     detailBtn.innerHTML = '상세정보';
//     link.innerHTML = '인스타그램';
//     closeBtn.textContent = '닫기';

//     content.classList.add('ovelay-wrap');
//     content.classList.add('ovelay-hide');
//     info.classList.add('ovelay-info');
//     title.classList.add('ovelay-title');
//     closeBtn.classList.add('ovelay-close');
//     body.classList.add('ovelay-body');
//     imgbox.classList.add('ovelay-img');
//     desc.classList.add('ovelay-desc');
//     address.classList.add('ovelay-ellipsis');
//     discountInfo.classList.add('ovelay-jibun', 'ovelay-ellipsis');
//     link.classList.add('ovelay-link');
//     detailBtn.classList.add('ovelay-detail-btn');

//     img.setAttribute(
//       'src',
//       'https://blog.kakaocdn.net/dn/btO0pU/btq3oTqzzgH/rr2jaLy4JwAYiwltUwT9fK/img.jpg',
//     );
//     img.setAttribute('width', '75px');
//     img.setAttribute('height', '75px');
//     detailBtn.onclick = function () {
//       overlay.setMap(null);
//     };
//     link.setAttribute(
//       'href',
//       'https://www.instagram.com/thanksto__zerowaste.seoul/',
//     );
//     link.setAttribute('target', '_blank');

//     closeBtn.onclick = function () {
//       overlay.setMap(null);
//     };

//     // 마커 위에 커스텀오버레이 표시
//     // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정
//     const overlay = new kakao.maps.CustomOverlay({
//       content: content,
//       map: map,
//       position: latlng,
//     });
//     overlay.setContent(content); // 오버레이에 content 표시

//     // 마커를 클릭했을 때 커스텀 오버레이 표시
//     kakao.maps.event.addListener(marker, 'click', function () {
//       content.classList.remove('ovelay-hide');
//       overlay.setMap(map);
//     });

//     // 내 위치 기반 버튼
//     const positionContent = document.createElement('div');
//     const positionButton = document.createElement('button');
//     // <i class="fas fa-crosshairs"></i>;

//     positionContent.appendChild(positionButton);

//     positionButton.textContent = '내 위치 검색';
//     positionButton.classList.add('position-btn');

//     // HTML5의 geolocation으로 사용할 수 있는지 확인
//     if (navigator.geolocation) {
//       // GeoLocation을 이용해서 접속 위치 확인
//       navigator.geolocation.getCurrentPosition(function (position) {
//         const lat = position.coords.latitude, // 위도
//           lon = position.coords.longitude; // 경도

//         const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
//           message = '<div style="padding:5px;">나의 위치</div>'; // 인포윈도우에 표시될 내용

//         // 마커와 인포윈도우를 표시
//         displayMarker(locPosition, message);
//       });
//     } else {
//       // HTML5의 GeoLocation을 사용할 수 없을 때 마커 표시 위치와 인포윈도우 내용 설정
//       const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
//         message = '위치 확인이 어려워요.';

//       displayMarker(locPosition, message);
//     }

//     // 지도에 마커와 인포윈도우 표시 함수
//     function displayMarker(locPosition, message) {
//       // 마커 생성
//       const marker = new kakao.maps.Marker({
//         map: map,
//         position: locPosition,
//       });

//       const iwContent = message, // 인포윈도우에 표시할 내용
//         iwRemoveable = true;

//       // 인포윈도우 생성
//       const infowindow = new kakao.maps.InfoWindow({
//         content: iwContent,
//         removable: iwRemoveable,
//       });

//       // 인포윈도우 마커 위에 표시
//       infowindow.open(map, marker);

//       // 지도 중심좌표를 접속위치로 변경
//       map.setCenter(locPosition);
//     }

// // 키워드로 장소 검색 -> 목록으로 보여주기
// const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
// const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 마커를 클릭하면 장소명을 보여줄 인포윈도우
// const markers = []; // 마커를 담을 배열

// const searchContent = document.createElement('div');
// const searchInput = document.createElement('input');
// const searchButton = document.createElement('button');

// searchContent.append(searchInput, searchButton);

// searchInput.id = 'keyword';
// searchInput.setAttribute('placeholder', '키워드를 입력하세요.');
// searchButton.textContent = '검색';
// searchContent.addEventListener('click', searchPlaces);

// // 키워드 검색을 요청하는 함수
// function searchPlaces() {
//   var keyword = document.getElementById('keyword').value;

//   if (!keyword.replace(/^\s+|\s+$/g, '')) {
//     alert('키워드를 입력해주세요!');
//     return false;
//   }
//   ps.keywordSearch(keyword, placesSearchCB); // 장소검색 객체를 통해 키워드로 장소검색 요청
// }

// // 장소검색이 완료됐을 때 호출되는 콜백함수
// function placesSearchCB(data, status, pagination) {
//   if (status === kakao.maps.services.Status.OK) {
//     displayPlaces(data);
//     displayPagination(pagination); // 페이지 번호 표시
//   } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
//     alert('검색 결과가 존재하지 않습니다.');
//     return;
//   } else if (status === kakao.maps.services.Status.ERROR) {
//     alert('오류가 발생했습니다. 다시 시도해 주세요!');
//     return;
//   }
// }

// // 검색 결과 목록과 마커 표시 함수
// const displayPlaces = (places) => {
//   const listEl = document.getElementById('placesList');
//   const menuEl = document.getElementById('menu_wrap');
//   const fragment = document.createDocumentFragment();
//   const bounds = new kakao.maps.LatLngBounds();
//   const listStr = '';

//   removeAllChildNods(listEl); // 검색 결과 목록에 추가된 항목들 제거
//   removeMarker(); // 지도에 표시되고 있는 마커 제거

//   // 마커를 생성하고 지도에 표시 (검색 결과 항목 Element를 생성)
//   for (let i = 0; i < places.length; i++) {
//     const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
//     const marker = addMarker(placePosition, i);
//     const itemEl = getListItem(i, places[i]);

//     bounds.extend(placePosition); // 검색된 장소 위치 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표 추가

//     // 마커와 검색결과 항목에 mouseover -> 인포윈도우에 장소명 표시
//     (function (marker, title) {
//       kakao.maps.event.addListener(marker, 'mouseover', function () {
//         displayInfowindow(marker, title);
//       });

//       kakao.maps.event.addListener(marker, 'mouseout', function () {
//         infowindow.close();
//       });

//       itemEl.onmouseover = function () {
//         displayInfowindow(marker, title);
//       };

//       itemEl.onmouseout = function () {
//         infowindow.close();
//       };
//     })(marker, places[i].place_name); // 함수 선언 후 바로 실행

//     fragment.appendChild(itemEl);
//   }

//   // 검색결과 항목들을 검색결과 목록 Element에 추가
//   listEl.appendChild(fragment);
//   menuEl.scrollTop = 0;

//   // 검색된 장소 위치 기준으로 지도 범위 재설정
//   map.setBounds(bounds);
// };

// // 검색결과 항목을 Element로 반환
// function getListItem(index, places) {
//   const el = document.createElement('li'),
//     itemStr =
//       '<span class="markerbg marker_' +
//       (index + 1) +
//       '"></span>' +
//       '<div class="info">' +
//       '   <h5>' +
//       places.place_name +
//       '</h5>';

//   if (places.road_address_name) {
//     itemStr +=
//       '    <span>' +
//       places.road_address_name +
//       '</span>' +
//       '   <span class="jibun gray">' +
//       places.address_name +
//       '</span>';
//   } else {
//     itemStr += '    <span>' + places.address_name + '</span>';
//   }

//   itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

//   el.innerHTML = itemStr;
//   el.className = 'item';

//   return el;
// }

// // 마커 생성하고 지도 위에 마커 표시하는 함수
// const addMarker = (position, idx, title) => {
//   const imageSrc =
//       'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지 사용
//     imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
//     imgOption = {
//       spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//       spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//       offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//     },
//     markerImage = new kakao.maps.MarkerImage(
//       imageSrc,
//       imageSize,
//       imgOption,
//     ),
//     marker = new kakao.maps.Marker({
//       position: position, // 마커의 위치
//       image: markerImage,
//     });

//   marker.setMap(map); // 지도 위에 마커 표시
//   markers.push(marker); // 배열에 생성된 마커를 추가

//   return marker;
// };

// // 지도 위에 표시되고 있는 마커 모두 제거
// const removeMarker = () => {
//   for (let i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// };

// // 검색결과 목록 하단에 페이지번호 표시하는 함수
// const displayPagination = (pagination) => {
//   const paginationEl = document.getElementById('pagination');
//   const fragment = document.createDocumentFragment();
//   let i;

//   // 기존에 추가된 페이지번호 삭제
//   while (paginationEl.hasChildNodes()) {
//     paginationEl.removeChild(paginationEl.lastChild);
//   }

//   for (i = 1; i <= pagination.last; i++) {
//     const el = document.createElement('a');
//     el.href = '#';
//     el.innerHTML = i;

//     if (i === pagination.current) {
//       el.className = 'on';
//     } else {
//       el.onclick = (function (i) {
//         return function () {
//           pagination.gotoPage(i);
//         };
//       })(i);
//     }
//     fragment.appendChild(el);
//   }
//   paginationEl.appendChild(fragment);
// };

// // 검색결과 목록 또는 마커를 클릭했을 때 호출 함수
// function displayInfowindow(marker, title) {
//   const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//   infowindow.setContent(content);
//   infowindow.open(map, marker); // 인포윈도우에 장소명 표시
// }

// // 검색결과 목록의 자식 Element 제거 함수
// function removeAllChildNods(el) {
//   while (el.hasChildNodes()) {
//     el.removeChild(el.lastChild);
//   }
// }
//   }, []);

//   return <div id="map" style={{ width: '700px', height: '700px' }}></div>; // 지도 크기
// }
// export default Map;

// --------------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// import '../styles/Map.scss';

// const { kakao } = window;

// function Map() {
//   const [LatLng, setLatLng] = useState([37.51040624439627, 127.05862531328155]);
//   const [map, setMap] = useState({});
//   const [mapLevel, setMapLevel] = useState(3);
//   const [dataMarker, setDataMarker] = useState([]);
//   const [markerList, setMarkerList] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [searchList, setSearchList] = useState([]);
//   const [searchMode, setSearchMode] = useState(false);
//   const [searchLatLng, setSearchLatLng] = useState([
//     37.51040624439627, 127.05862531328155,
//   ]);

//   useEffect(() => {
//     kakao.maps.load(() => {
//       loadKakaoMap();
//     });
//   });

//   function loadKakaoMap() {
//     const mapContainer = document.getElementById('map');
//     const mapOption = {
//       center: new kakao.maps.LatLng(LatLng[0], LatLng[1]), //지도의 중심좌표
//       level: mapLevel, //지도의 레벨(확대, 축소 정도)
//     };
//     const map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 & 객체 리턴

//     const mapTypeControl = new kakao.maps.MapTypeControl(); // 일반 지도, 스카이뷰
//     map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

//     const zoomControl = new kakao.maps.ZoomControl(); // 확대, 축소
//     map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

//     setMap(map);
//   }

//   // DB에 저장된 가게들
//   // useEffect(() => {
//   //   axios
//   //     .get(`https://localhost:4000/main`)
//   //     .then((body) => {
//   //       setMarkerList(body);
//   //     })
//   //     .catch((err) => console.error(err));
//   // }, [markerList]);

//   function viewMarkers() {
//     // deleteMarkers();
//     //   for (let i = 0; i < markerList.length; i++) {
//     //     const markerImage = new window.kakao.maps.MarkerImage(
//     //       `/images/marker/theme0.png`,
//     //       new window.kakao.maps.Size(48, 59),
//     //       { offset: new window.kakao.maps.Point(20, 50) },
//     //     );

//     //     const position = new kakao.maps.LatLng(
//     //       markerList[i].latitude,
//     //       markerList[i].longtitude,
//     //     );

//     //     const marker = new window.kakao.maps.Marker({
//     //       map,
//     //       position,
//     //       image: markerImage,
//     //     });
//     //     const iwContent = '<div class="markerInfo">' + '덕분애' + '</div>';

//     //     const infowindow = new kakao.maps.InfoWindow({
//     //       content: iwContent,
//     //     });

//     //     kakao.maps.event.addListener(marker, 'mouseover', function () {
//     //       infowindow.open(map, marker);
//     //     });

//     //     kakao.maps.event.addListener(marker, 'mouseout', function () {
//     //       infowindow.close();
//     //     });
//     //     marker.setMap(map);
//     //     markerList.push(marker);
//     //   }
//     //   setDataMarker(markerList);
//     // }
//     const markerList = [];
//     const position = new kakao.maps.LatLng(37.497079, 127.023495);
//     const image = new window.kakao.maps.MarkerImage(
//       `/images/marker/post-marker.png`,
//       new window.kakao.maps.Size(45, 45),
//       { offset: new window.kakao.maps.Point(8, 50) },
//     );
//     const marker = new kakao.maps.Marker({
//       map,
//       position,
//       image,
//     });

//     // const iwContent = `<div class="markerInfo">${markerList[i].name}</div>`;
//     const iwContent = '<div class="markerInfo">' + '덕분애' + '</div>';

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
//     markerList.push(marker);
//     setDataMarker(markerList);
//   }

//   viewMarkers();

//   return <div id="map" style={{ width: '700px', height: '700px' }}></div>;
// }

// export default Map;
