import axios from 'axios';
import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import '../styles/CafeInfo.scss';

// 바깥쪽 클릭시 창 닫기 custom hooks
// let useClickOutside = (handler) => {
//   let domNode = useRef();

//   useEffect(() => {
//     let windowHandler = (e) => {
//       if (!domNode.current.contains(e.target)) {
//         handler();
//       }
//     };
//     document.addEventListener("mousedown", windowHandler);
//     return () => {
//       document.removeEventListener("mousedown", windowHandler);
//     };
//   });

//   return domNode;
// }

export const CafeInfo = ({ cafeToggleRef }) => {
  const [toggledCafeId, setToggledCafeId] = useState();
  const [cafe, setCafe] = useState('');
  // const [isToggleOn, setIsToggleOn] = useState(false);

  const fetchCafe = useCallback(async () => {
    const cafeListResponse = await axios.get('http://localhost:4000/cafe/list');
    const findCafe = cafeListResponse.data.find(
      ({ id }) => id === toggledCafeId,
    );
    setCafe(findCafe);
  }, [toggledCafeId]);

  console.log('cafe :', cafe);

  useEffect(() => {
    fetchCafe();
  }, [fetchCafe]);

  // map & search 연결
  useImperativeHandle(cafeToggleRef, () => ({
    toggle: (cafeId) => {
      setToggledCafeId(cafeId);
    },
  }));

  if (!toggledCafeId || !cafe) {
    return <></>;
  }

  // let domNode = useClickOutside(() => {
  //   // 토글 닫는 함수 만들고, 그 함수를 여기서 실행시켜주면 토글 바깥쪽 클릭 시 닫기
  //   // cafe-toggle_container 속성에 ref={domNode} 추가
  // })

  const cafeKeywords = cafe.keyword.split(',');

  return (
    <div id="cafe-toggle_container">
      <div id="cafe-toggle_info">
        <div id="cafe-toggle_imgbox"><img src={cafe.image} alt="이미지" /></div>
        <div id="cafe-toggle_desc">
          <div className="cafe-toggle_desc_title">
            <div>{cafe.name}</div>
            <div className="cafe-toggle_desc_title_iconbox">
              <i className="fas fa-heart"></i>
              <i className="fas fa-bookmark"></i>
            </div>
          </div>
          <ul className="cafe-toggle_desc_keyword">
            {cafeKeywords.map((keyword, idx) => (
              <li key={idx} className="keywords_keyword">{keyword}</li>
            ))}</ul>
          <a href={cafe.link} target="_black">홈페이지로 이동</a>
          <div>{cafe.review}</div>
          <div>{cafe.address}</div>
          <div>{cafe.description}</div>
        </div>
      </div>
    </div >
  );
};


// <i class="far fa-thumbs-up"></i> // 빈 좋아요
// <i class="fas fa-thumbs-up"></i> // 꽉찬 좋아요

// <i class="far fa-bookmark"></i> // 빈 북마크
// <i class="fas fa-bookmark"></i> // 꽉찬 북마크

// <i class="far fa-heart"></i> // 빈 하트
// <i class="fas fa-heart"></i> // 꽉찬 하트