import React from 'react';
import { useLocation } from 'react-router-dom';

function Result({ sleepData: propsSleepData }) {
  const location = useLocation();
  const stateSleepData = location.state?.sleepData; // 전달된 수면 데이터

  // props로 전달된 sleepData를 우선 사용하고, 없다면 location.state로부터 가져옵니다.
  const sleepData = propsSleepData || stateSleepData;

  if (!sleepData) {
    return <div style={styles.noData}>수면 데이터가 없습니다.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>당신의 수면 결과는...</h1>
      <div style={styles.box}>
        <h3 style={styles.subtitle}>{sleepData.email}님의 수면 결과</h3>
        <div style={styles.text}>
          수면 날짜: {sleepData.rdate} <br /><br />
          오늘 수면에 영향을 준 요소: {sleepData.impname}<br />
          바꿔야 할 수면 패턴은 {sleepData.impvalue} 입니다. <br /><br />
          ChatBot 답변: {sleepData.rchat}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1em',
    width: '100%',
    boxSizing: 'border-box',
  },
  noData: {
    fontSize: '18px',
    color: 'black',
    textAlign: 'center',
    marginTop: '2em',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: '1em',
  },
  box: {
    border: '2px',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgb(221, 221, 221)',
    maxWidth: '90%',
    width: '600px',
    margin: '0 auto',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '1em',
  },
  text: {
    fontSize: '18px',
    color: 'black',
    lineHeight: '1.6',
  },
};

// 반응형 스타일 추가
const isMobile = window.innerWidth <= 768;

if (isMobile) {
  styles.title.fontSize = '24px';
  styles.box.padding = '15px';
  styles.box.width = '90%';
  styles.subtitle.fontSize = '18px';
  styles.text.fontSize = '16px';
}

export default Result;
