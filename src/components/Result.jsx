import React from 'react';
import { useLocation } from 'react-router-dom';


function Result() {
  const location = useLocation();
  const sleepData = location.state?.sleepData; // 전달된 수면 데이터
  if (!sleepData) {
    return <div>수면 데이터가 없습니다.</div>;
  }

  const boxStyle = {
    border: '2px solid white', // 흰색 테두리
    borderRadius: '10px', // 모서리를 약간 둥글게
    padding: '30px', // 내용과 테두리 간의 여백
    textAlign: 'center', // 텍스트를 중앙 정렬
    color: 'black', // 텍스트 색상을 검정색으로 변경
    backgroundColor: 'white', // 박스 내부를 흰색으로 설정
    display: 'block', // 박스 크기 조정
    width: '30%', // 좌우 넓이를 줄임
    margin: '0 auto', // 박스를 화면 중앙에 위치하게 함
  };

  const textStyle = {
    fontSize: '30px', // 글씨 크기 증가
    color: 'black', // 글씨 색상을 검정색으로 설정
  };

  const titleStyle = {
    color: 'black', // 제목 텍스트를 검정색으로 변경
    fontSize: '24px', // 제목 글씨 크기 증가
    marginBottom: '20px', // 제목과 내용 사이의 간격 조정
  };

  return (
    <div>
      <h1>당신의 수면 결과는...</h1><br/>
      <ul>
        <li>
          <div style={boxStyle}>
            <h3 style={titleStyle}>{sleepData.email}님의 수면 결과</h3><br/>

            <div style={textStyle}>
              수면 날짜: {sleepData.rdate} <br/>
              오늘의 수면 패턴 : {sleepData.impname} <br/>
              당신의 수면 생활 : {sleepData.impvalue} <br/>
              ChatBot 답변 : {sleepData.rchat} 입니다.
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Result;
