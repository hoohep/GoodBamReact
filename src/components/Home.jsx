import React, { useEffect, useState } from 'react';

const Home = () => {

  // 카카오 프로필 가져오기
  // const [profile, setProfile] = useState(null);




  return (
    <div className="main-container">


      <h2>Main 홈</h2>
      <p>환영합니다!</p>






      {/* {profile && (
        <div>
          <h3>사용자 프로필</h3>
          <p>닉네임: {profile.properties?.nickname}</p>
          <p>이메일: {profile.kakao_account?.email}</p>
        </div>
      )} */}

    </div>
  );
};

export default Home