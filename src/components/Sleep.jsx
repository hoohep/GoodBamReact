import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sleep() {
  const [sleepData, setSleepData] = useState(null); // 수면 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태 관리
  const [error, setError] = useState(null);  // 에러 상태 관리
  const navigate = useNavigate();  // useNavigate 훅을 사용하여 리다이렉트 처리

  useEffect(() => {
      // 사용자 토큰이나 ID를 통해 수면 데이터를 가져옴
      const userId = localStorage.getItem('token'); // 예시로 로컬 스토리지에서 사용자 ID를 가져옴

      if (!userId) {
        // 비회원 상태일 때 Login 페이지로 리다이렉트
        navigate('/Login');
        return;
      }
 
      // API 호출
      axios.get(`/api/sleep-data/${userId}`)
      .then(response => {
          const data = response.data;
          if (data.length === 0) {
              setSleepData(null); // 데이터가 없으면 null로 설정
          } else {
              setSleepData(data); // 데이터를 상태에 저장
          }
          setLoading(false); // 로딩 상태 해제
      })
      .catch(error => {
          console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
          setLoading(false);
      });
  }, [navigate]); // 컴포넌트가 처음 렌더링될 때만 실행

if (loading) {
    return <div>Loading...</div>;  // 로딩 중일 때 표시할 문구 (서버가 안 켜져있을 때 Loading만 출력)
}

if (error) {
    return <div>{error}</div>;  // 에러 발생 시 표시할 문구 (에러의 경위는 다양)
}

if (!sleepData) {
    return <div>수면 데이터가 없습니다. 디바이스를 연결해주세요.</div>;  // 수면 데이터가 없을 때 표시할 문구
}

// DB에 수면 데이터가 있는 경우 해당 데이터를 화면에 렌더링 --> 수면 시간, 수면 날짜, 이름 등...
return (
    <div>
        <h1>당신의 결과는......</h1>
        <ul>
            {sleepData.map((data, index) => (
                <li key={index}>
                    {data.name}님의 수면 결과,
                    날짜: {data.date},
                    수면 시간: {data.sleepHours}시간
                </li>
            ))}
        </ul>
    </div>
  );
}


export default Sleep 