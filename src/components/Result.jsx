import React from 'react';

function Result({ sleepData }) {
  if (!sleepData) {
    return <div>수면 데이터가 없습니다.</div>;
  }

  return (
    <div>
      <h1>당신의 수면 결과는...</h1><br/>
      <ul>
        <li>
          <h3>{sleepData.email}님의 수면 결과 </h3><br/>

          수면 날짜: {sleepData.rdate} <br/>
          오늘의 수면 패턴: {sleepData.impname} <br/>
          당신의 수면 생활: {sleepData.impvalue} <br/>
          해결책으로 드릴 방안: {sleepData.rchat} 입니다.
        </li>
      </ul>
    </div>
  );
}

export default Result;