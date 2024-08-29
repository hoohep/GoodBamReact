import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/result.css'
import { FaChevronLeft } from "react-icons/fa";
import img1 from '../assets/imogi1.png';

function Result({ sleepData: propsSleepData }) {
    const location = useLocation();
    const nav = useNavigate();
    const stateSleepData = location.state?.sleepData; // 전달된 수면 데이터

    // props로 전달된 sleepData를 우선 사용하고, 없다면 location.state로부터 가져옵니다.
    const sleepData = propsSleepData || stateSleepData;

    const handleBack = () => {
        nav(-1)
    }

    if (!sleepData) {
        return (
                <div className='result-none'>
                    <img src={img1} />
                    수면 데이터가 없습니다.
                </div>
            );
    }

    return (
        <div className='result-container'>
            <p className='result-title'>당신의 수면 결과는...</p>
            <div className='result-box'>
                <div className='result-content'>
                    <p>{sleepData.email}님의 수면 결과</p>
                    수면 날짜: {sleepData.rdate} <br /><br />
                    오늘 수면에 영향을 준 요소: {sleepData.impname}<br />
                    바꿔야 할 수면 패턴은 {sleepData.impvalue} 입니다. <br /><br />
                    ChatBot 답변: {sleepData.rchat}
                </div>
            </div>
            <button onClick={handleBack} className='result-btn'><FaChevronLeft style={{marginRight:'10px'}}/>Back</button>
        </div>
    );
}

export default Result;
