import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/result.css'
import { FaChevronLeft } from "react-icons/fa";
import { motion } from 'framer-motion';
import img1 from '../assets/imogi1.png';
import img2 from '../assets/imogi2.png';
import img3 from '../assets/imogi3.png';
// import img4 from '../assets/imogi4.png';
import img4 from '../assets/imogi5.png';

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
            <p className='result-title'>{sleepData.email}님의 수면 결과는...</p>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                    ease: 'easeInOut',
                    duration: 1,
                    y: { duration: 0.5 },
                }}>
            <div className='result-box'>
                <div className='result-content'>

                    {/* <p>{sleepData.email}님의 수면 결과</p> */}
                    <h3>{sleepData.prediction} 입니다.</h3>
                    <img src={sleepData.prediction === '수면부족' ? img2 : img3} />
                    <p>오늘 수면에 영향을 준 요소는 <span className='text-deco'>{sleepData.impname}</span> 입니다.</p>
                    <p>{sleepData.email}님이 올려야 할 수면 효율은 <span className='text-deco'>{sleepData.impvalue}</span> 입니다.</p>
                    <p>분석 날짜 : {sleepData.rdate}</p>
                
                </div>
            </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                    ease: 'easeInOut',
                    duration: 2,
                    y: { duration: 1 },
                }}>

            <div className='result-box'>
                <div className='result-content'>
                    <img src={img4} />
                    {sleepData.rchat}
                </div>
            </div>

            </motion.div>

            <button onClick={handleBack} className='result-btn'>
                <FaChevronLeft style={{ marginRight: '10px' }} />
                Back
            </button>
            
        </div>

    );
}

export default Result;
