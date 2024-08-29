import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Result from './Result';
import styled from 'styled-components';
import useAuth from '../Hooks/Auth';
import Swal from 'sweetalert2';
import '../style/sleep.css';

// 전체 페이지 스타일을 적용하기 위해 컨테이너 컴포넌트 추가
const SleepTitle = styled.div`
    font-size: 32px;
    text-align: center;
    margin: 1em 0 2em 0;
    color: #fff;
    font-family: 'BMJUA';
`;

const Footer = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    background-color: transparent;
    color: #fff;
    text-align: center;
    padding: 1em 0;
`;

function Sleep() {
  useAuth();
  const nav = useNavigate();  // useNavigate 훅을 사용하여 리다이렉트 처리

  const [sleepData, setSleepData] = useState(null); // 수면 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태 관리
  const [error, setError] = useState(null);  // 에러 상태 관리

  useEffect(() => {
    // 스크롤 방지
    document.body.style.overflow = 'hidden';

    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기

    // API 호출을 통해 수면 데이터 가져오기
    axios.get("http://localhost:8092/result", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const data = response.data;
        console.log(data);
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

    // 페이지가 언마운트될 때 스크롤을 원래대로 돌리기
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [nav]);  // 빈 의존성 배열로 컴포넌트가 처음 렌더링될 때만 실행

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중 표시할 문구 또는 스피너
  }

  if (error) {
    Swal.fire({
      title: "오류 발생",
      text: "다시 접속해주세요.",
      icon: "error"
    });
  }

  if (!sleepData) {   // 수면 데이터가 없을 때 표시할 문구
    Swal.fire({
      title: "분석 실패",
      text: "수면 데이터가 없습니다.",
      icon: "error"
    });
  }

  // 수면 데이터가 있는 경우 해당 데이터를 화면에 렌더링
  return (
    <div className='page-container'>
      <div className='content-container'>
        <div className='sleep-container'>
          <SleepTitle>수면 분석 결과</SleepTitle>
          <Result sleepData={sleepData} />  {/* Result 컴포넌트에 sleepData 전달 */}
        </div>
      </div>
      <Footer>
      COPYRIGHT © 2024 GOODBAM, ALL RIGHTS RESERVED
      </Footer>
    </div>
  );
}

export default Sleep;
