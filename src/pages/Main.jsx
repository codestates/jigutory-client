import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Map.scss';

const { kakao } = window;

function Map() {
  // DB에서 받은 cafe 정보들을 객체형태로 상태 저장
  const [cafeInfo, setCafeInfo] = useState(
    {
      name: '',
      latlng: [],
      imgUrl: '',
      keyword: [],
      address: '',
    })


  console.log('cafeinfo state :', cafeInfo);
  let cafes = [];

  useEffect(() => {
    axios.get('http://localhost:4000/cafe/list', {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        console.log('res.data 정보 : ', res.data);

        for (let i = 0; i < res.data.length; i++) {
          cafes.push(cafeInfo);
          setCafeInfo({
            name: res.data[i].name,
            latlng: [res.data[i].latitude, res.data[i].longitude],
            imgUrl: res.data[i].image,
            keyword: res.data[i].keyword.split(','),
            address: res.data[i].description,
          })
        }
      })
  }, []);

  console.log('cafes : ', cafes)

  useEffect(() => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
        center: new kakao.maps.LatLng(37.474675616877455, 126.90353931151591), // 지도의 중심좌표 (데일리 로스팅)
        level: 7, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
      };

    // 지도를 생성한다 
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
    });

    // 마커 클러스터러 생성 (필수기능 아님)
    var clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 10 // 클러스터 할 최소 지도 레벨 
    });

    // DB에서 받아오기 전 임시 데이터
    const data = [
      {
        name: '데일리로스팅',
        latlng: [37.474675616877455, 126.90353931151591],
        img: 'https://img1.kakaocdn.net/relay/local/R1920x0/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Ffiy_reboot%2Fplace%2FB662A3E4487847AE88160947F5D6FEC4',
        keyword: ['카페', '300원 할인'],
        address: '서울 금천구 독산로 312 1층',
      },
      {
        name: '브릿지엣지',
        latlng: [37.50246841303278, 126.95435664220236],
        img: 'https://img1.kakaocdn.net/relay/local/R1920x0/?fname=http%3A%2F%2Fpostfiles3.naver.net%2FMjAyMDAyMTlfMTMy%2FMDAxNTgyMDM4MDgzMTc5.SV-XhUIwOgZA-eqhE8YnpczWIae8Dj34S9XUgy8L-Gwg.GtRHpfmZNqKmS2b9FbChC1tLzHzdF_QT9ox9Y_ej5z4g.JPEG.duck0624%2F20200215_141735.jpg%',
        keyword: ['카페', '300원 할인'],
        address: '서울 동작구 상도로53길 70 상도에스에이치빌 상가 311호',
      },
      {
        name: '카페 기웃기웃',
        latlng: [37.555116072768726, 126.93367811695838],
        img: 'https://img1.kakaocdn.net/relay/local/R1920x0/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F3500C1E35D9545299E4A8FC9002A2609',
        keyword: ['카페', '1500원 할인'],
        address: '서울 마포구 신촌로12다길 20 스테이하이오피스텔 1층',
      },
      {
        name: 'Coloured Bean',
        latlng: [37.56830657923259, 126.92911361521838],
        img: 'http://blog.naver.com/storyphoto/viewer.jsp?src=https%3A%2F%2Fblogfiles.pstatic.net%2FMjAyMTA2MjNfMTI2%2FMDAxNjI0NDA0ODIxMDcz.Q3SavEUuonT7yYNNRTTszMlV5xH3QUlc_QBnf3Bqt5wg.cLV0cuyO1SLmEsw8NljN9GM9s67JGPJBye1ldMONvOEg.JPEG.xwjdtmfwlx77%2FSE-967b89a7-63f2-45',
        keyword: ['카페', '1000원 할인', '텀블러 세척'],
        address: '서울 서대문구 연희로11가길 8-8',
      },
      {
        name: '달냥',
        latlng: [37.60881125598784, 126.93388692871227],
        img: 'https://img1.kakaocdn.net/relay/local/R1920x0/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2FE4FFC0CEA7E94FFA86A741D634592CFD',
        keyword: ['비건', '카페', '음식점', '500원 할인'],
        address: '서울 은평구 통일로 684 서울혁신파크 상상청 1층',
      },
    ];

    // 반복문으로 생성될 여러개의 마커들(data)을 담을 배열
    let markers = [];

    for (let i = 0; i < data.length; i++) {
      // 마커 이미지의 주소 (커스텀 마커 생성)
      var markerImageUrl = 'https://cdn.iconscout.com/icon/premium/png-512-thumb/location-pin-162-626841.png',
        markerImageSize = new kakao.maps.Size(30, 32), // 마커 이미지의 크기
        markerImageOptions = {
          offset: new kakao.maps.Point(20, 42)// 마커 좌표에 일치시킬 이미지 안의 좌표
        };

      // 마커 이미지 생성
      var markerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize, markerImageOptions);

      // 지도에 마커 생성 + 표시
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(data[i].latlng[0], data[i].latlng[1]), // 마커의 좌표
        image: markerImage, // 마커의 이미지
        map: map // 마커를 표시할 지도 객체
      });

      var iwContent = `<div style="padding:5px;">${data[i].name}</div>`; // 인포윈도우에 표출될 내용 (HTML 문자열이나 document element 가능)

      // 인포윈도우 생성
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent
      });

      // 반복문으로 생성된 마커들을 배열에 담아줌 
      markers.push(marker);

      // 마커 마우스오버 이벤트
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow, marker));
    }

    // 클러스터러에 마커스 추가 (지도 축소했을 때 마커 갯수 파악)
    clusterer.addMarkers(markers);

    // 인포윈도우를 표시하는 클로저를 만드는 함수
    function makeOverListener(map, marker, infowindow) {
      return function () {
        // 마커 위에 인포윈도우를 표시. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker);
      };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  })

  return <div id="map" style={{ width: '95%', height: '80vh' }}></div>;
}

export default Map;

