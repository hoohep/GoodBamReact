import React from 'react';

function Result({ sleepData }) {
  if (!sleepData || sleepData.length === 0) {
    return <div>수면 데이터가 없습니다.</div>;
  }

  return (
    <div>
      <h1>당신의 수면 결과</h1>
      <ul>
        {sleepData.map((data, index) => (
          <li key={index}>
            {data.name}님의 수면 결과 - 
            날짜: {data.date}, 
            수면 시간: {data.sleepHours}시간
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Result;