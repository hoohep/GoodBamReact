import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // localStorage에서 액세스 토큰 가져오기
  const token = localStorage.getItem('access_token');
  console.log('저장된 토큰:', token);

  useEffect(() => {
    if (token) {
      axios({
        url: 'https://kapi.kakao.com/v2/user/me',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log('프로필 정보:', res.data);
          setProfile(res.data);
        })
        .catch((err) => {
          console.error('프로필 정보 요청 에러:', err);
          setError('프로필 정보를 가져오는 데 실패했습니다.');
        });
    } else {
      console.error('액세스 토큰이 없습니다.');
    }
  }, [token]);

  // 토큰 날리기 함수
  const handleLogout = () => {
    // localStorage에서 액세스 토큰 삭제
    localStorage.removeItem('access_token');
    // 카카오 API를 호출하여 사용자 unlink 처리한 후 로그인 페이지로 리다이렉트
    // 연결 끊기 API를 사용하는 로그아웃 처리
    axios({
      url: 'https://kapi.kakao.com/v1/user/unlink',
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('연결 끊기 성공:', response.data);
        // 연결 해제 후 로그인 페이지로 리디렉트
        navigate('/');
      })
      .catch(error => {
        console.error('연결 끊기 실패:', error);
      });
  };

  return (
    <div className="login-success">
      <h2>로그인 성공</h2>
      <p>환영합니다! 로그인에 성공했습니다.</p>
      {error && <p>{error}</p>}
      {profile && (
        <div>
          <h3>사용자 프로필</h3>
          <p>닉네임: {profile.properties?.nickname}</p>
          <img src={profile.properties?.profile_image} alt="Profile" style={{ width: '100px', height: '100px' }} />
        </div>
      )}

      <button type="button" onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Home