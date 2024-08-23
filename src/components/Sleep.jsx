import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer'; // Footer 컴포넌트 import
import Result from './Result'; // Result 컴포넌트 import
import styled from 'styled-components';

// 전체 페이지 스타일을 적용하기 위해 컨테이너 컴포넌트 추가
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

function Sleep() {
  const [sleepData, setSleepData] = useState(null); // 수면 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태 관리
  const [error, setError] = useState(null);  // 에러 상태 관리
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 리다이렉트 처리

  useEffect(() => {
      const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기

      if (!token) {
        navigate('/Login');  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
        return;
      }

      // API 호출을 통해 수면 데이터 가져오기
      axios.get("http://localhost:8092/result", {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
          const data = response.data;
          if (!data || data.length === 0) {
              setSleepData(null); // 데이터가 없으면 null로 설정
          } else {
              setSleepData(data); // 데이터를 상태에 저장
          }
      })
      .catch(error => {
          console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
      })
      .finally(() => {
          setLoading(false); // 로딩 상태 해제
      });
  }, [navigate]);  // 빈 의존성 배열로 컴포넌트가 처음 렌더링될 때만 실행

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중 표시할 문구 또는 스피너
  }

  if (error) {
    return <div>{error}</div>;  // 에러 발생 시 표시할 문구
  }

  if (!sleepData) {
    return <div>수면 데이터가 없습니다. 디바이스를 연결해주세요.</div>;  // 수면 데이터가 없을 때 표시할 문구
  }

  // 수면 데이터가 있는 경우 해당 데이터를 화면에 렌더링
  return (
    <PageContainer>
      <ContentContainer>
        <Result sleepData={sleepData} />  {/* Result 컴포넌트에 sleepData 전달 */}
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}

export default Sleep;
