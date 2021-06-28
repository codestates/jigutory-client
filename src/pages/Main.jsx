import React, { useEffect } from 'react';
import '../styles/Map.scss';

const { kakao } = window;

function Map() {
  useEffect(() => {
    const mapContainer = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const mapOption = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.51040624439627, 127.05862531328155), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(mapContainer, mapOption); //지도 생성 및 객체 리턴

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤 생성
    const mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됨.
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // const setCenter = () => {
    //   const moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888); // 이동할 위도, 경도 위치 생성

    //   map.setCenter(moveLatLon); // 지도 중심 이동
    // };

    // const panTo = () => {
    //   const moveLatLon = new kakao.maps.LatLng(33.45058, 126.574942); // 이동할 위도, 경도 위치 생성
    //   map.panTo(moveLatLon); // 지도 중심 부드럽게 이동
    // };

    // 여러 개 마커 표시 -> 내 위치
    // const positions = [
    //   {
    //     title: '덕분애',
    //     latlng: new kakao.maps.LatLng(37.49709604599899, 127.02349512685511),
    //   },
    //   {
    //     title: '알맹상점 & 카페 M',
    //     latlng: new kakao.maps.LatLng(37.55388916549269, 126.91156631143551),
    //   },
    //   {
    //     title: '얼스 어스',
    //     latlng: new kakao.maps.LatLng(37.564253659658924, 126.92326415561227),
    //   },
    //   {
    //     title: '보틀 팩토리',
    //     latlng: new kakao.maps.LatLng(37.575327346446805, 126.92846889794195),
    //   },
    //   {
    //     title: '샐러드박스 양천구청점',
    //     latlng: new kakao.maps.LatLng(37.516006068268204, 126.86279026910515),
    //   },
    // ];

    // // 마커 이미지의 이미지 주소
    // const imageSrc =
    //   'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    // for (let i = 0; i < positions.length; i++) {
    //   // 마커 이미지의 이미지 크기
    //   const imageSize = new kakao.maps.Size(24, 35);

    //   // 마커 이미지 생성
    //   const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //   // 마커 생성
    //
    //   const marker = new kakao.maps.Marker({
    //     map: map, // 마커를 표시할 지도
    //     position: positions[i].latlng, // 마커를 표시할 위치
    //     title: positions[i].title, // 마커에 마우스를 올리면 타이틀이 표시
    //     image: markerImage, // 마커 이미지
    //   });
    // }

    // 지도에 마커 표시 + 간단한 정보 표시
    // forEach 사용하여 데이터베이스에서 여러개의 오버레이로 받아오기 가능 ??
    const latlng = new kakao.maps.LatLng(37.497079, 127.023495);

    const marker = new kakao.maps.Marker({
      map: map,
      position: latlng,
    });

    // 커스텀 오버레이에 표시할 컨텐츠
    const content = document.createElement('div');
    const info = document.createElement('div');
    const title = document.createElement('div');
    const closeBtn = document.createElement('button');
    const body = document.createElement('div');
    const imgbox = document.createElement('div');
    const img = document.createElement('img');
    const desc = document.createElement('div');
    const address = document.createElement('div');
    const discountInfo = document.createElement('div');
    const link = document.createElement('a');
    const detailBtn = document.createElement('button');

    title.append(closeBtn);
    imgbox.append(img);
    desc.append(address, discountInfo, link, detailBtn)
    body.append(imgbox, desc);
    info.append(title, body, closeBtn);
    content.append(info);

    title.textContent = '덕분애';
    address.textContent = '서울특별시 서초구 서초동 1315';
    discountInfo.innerHTML = '텀블러 500원 할인';
    detailBtn.innerHTML = '상세정보';
    link.innerHTML = '인스타그램';
    closeBtn.textContent = '닫기';

    content.classList.add('ovelay-wrap');
    content.classList.add('ovelay-hide');
    info.classList.add('ovelay-info');
    title.classList.add('ovelay-title');
    closeBtn.classList.add('ovelay-close');
    body.classList.add('ovelay-body');
    imgbox.classList.add('ovelay-img');
    desc.classList.add('ovelay-desc');
    address.classList.add('ovelay-ellipsis');
    discountInfo.classList.add('ovelay-jibun', 'ovelay-ellipsis');
    link.classList.add('ovelay-link');
    detailBtn.classList.add('ovelay-detail-btn');

    img.setAttribute(
      'src',
      'https://blog.kakaocdn.net/dn/btO0pU/btq3oTqzzgH/rr2jaLy4JwAYiwltUwT9fK/img.jpg',
    );
    img.setAttribute('width', '75px');
    img.setAttribute('height', '75px');
    detailBtn.onclick = function () {
      overlay.setMap(null);
    };
    link.setAttribute(
      'href',
      'https://www.instagram.com/thanksto__zerowaste.seoul/',
    );
    link.setAttribute('target', '_blank');


    closeBtn.onclick = function () {
      overlay.setMap(null);
    };
    // content.appendChild(closeBtn);

    // 마커 위에 커스텀오버레이 표시
    // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정
    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: latlng,
    });

    overlay.setContent(content); // 오버레이에 content 표시

    // 마커를 클릭했을 때 커스텀 오버레이 표시
    // 마커를 클릭하지 않으면 커스텀 오버레이 display : none, 클릭했을 때 보이게 css(.hide) 조작함 
    kakao.maps.event.addListener(marker, 'click', function () {
      content.classList.remove('ovelay-hide');
      overlay.setMap(map);
    });

    // 키워드로 장소 검색 -> 목록으로 보여주기
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 마커를 클릭하면 장소명을 보여줄 인포윈도우

    const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성

    ps.keywordSearch('스타벅스', placesSearchCB); // 키워드로 장소 검색

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표 추가
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        map.setBounds(bounds); // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트 등록
      kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명 인포윈도우에 표시
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          '</div>',
        );
        infowindow.open(map, marker);
      });
    }

    // 주소로 좌표 검색 -> 중심 좌표 설정
    //   const geocoder = new kakao.maps.services.Geocoder();

    //   geocoder.addressSearch(
    //     '서울 송파구 올림픽로 240',
    //     function (result, status) {
    //       // 정상적으로 검색이 완료됐으면
    //       if (status === kakao.maps.services.Status.OK) {
    //         const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //         // 결과값으로 받은 위치를 마커로 표시
    //         const marker = new kakao.maps.Marker({
    //           map: map,
    //           position: coords,
    //         });

    //         // 인포윈도우로 장소에 대한 설명 표시
    //         const infowindow = new kakao.maps.InfoWindow({
    //           content:
    //             '<div style="width:150px;text-align:center;padding:6px 0;">롯데월드</div>',
    //         });
    //         infowindow.open(map, marker);

    //         // 지도의 중심을 결과값으로 받은 위치로 이동
    //         map.setCenter(coords);
    //       }
    //     },
    //   );
  }, []);

  return <div id="map" style={{ width: '80vw', height: '700px' }}></div>; // 지도 크기
}

export default Map;
