import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';

import '../styles/Mypage.scss';

function Mypage() {
  const history = useHistory();

  return (
    <div className="mypage-container">
      <div className="mypage-container-top">
        <div className="mypage-userinfo">
          <div className="mypage-userinfo-left">
            <div>사진</div>
          </div>
          <div className="mypage-userinfo-right">
            <div className="mypage-userinfo-name">Lv 10 지구토리</div>
            <div className="mypage-userinfo-point">포인트</div>
            <button className="mypage-userinfo-edit" onClick={() => { history.push('/edituser') }}>회원정보 수정</button>

            <button className="mypage-userinfo-withdraw">회원탈퇴</button>
          </div>
        </div>
        <div className="mypage-eco">
          {/* <div className="mypage-eco-level">레벨</div> */}
          <button className="mypage-eco-me">나의 환경 지킨 횟수</button>
          <div className="mypage-eco-total">전체 환경 지킨 횟수</div>
          <div className="mypage-eco-carbon">나의 탄소 저감량</div>
        </div>
      </div>
      <div className="mypage-container-bottom">
        <div className="mypage-badge">
          <div className="mypage-badge-title">
            <div>내 뱃지 리스트</div>
          </div>
          <div className="mypage-badge-list">
            <div>뱃지1</div>
            <div>뱃지2</div>
            <div>뱃지3</div>
            <div>뱃지4</div>
            <div>뱃지5</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Mypage);
