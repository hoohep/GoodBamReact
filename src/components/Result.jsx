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

            {/* 수면 결과 */}
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

                        <p>{sleepData.email}님의 수면상태는 <h3>{sleepData.prediction}</h3></p>
                        <img src={sleepData.prediction === '수면부족' ? img2 : img3} />

                        <p>오늘 수면에 영향을 준 요소는 <span className='text-deco'>{sleepData.impname}</span> 입니다.</p>

                        <p>좋은 수면을 위해 {sleepData.impname}을 <br />
                            {/* <span className='text-deco'>{sleepData.impvalue}</span> */}
                            {sleepData.impname === '체지방' ?
                                <span className='text-deco'>{sleepData.impvalue}%</span>
                                :
                                sleepData.impname === 'time' ?
                                    <span className='text-deco'>{sleepData.impvalue}분</span>
                                    :
                                    sleepData.impname === 'distance' ?
                                        <span className='text-deco'>{sleepData.impvalue}m</span>
                                        :
                                        sleepData.impname === 'calories' ?
                                            <span className='text-deco'>{sleepData.impvalue}kcal</span>
                                            :
                                            sleepData.impname === '체중' ?
                                                <span className='text-deco'>{sleepData.impvalue}kg</span>
                                                :
                                                //steps의 경우
                                                <span className='text-deco'>{sleepData.impvalue}걸음</span>
                            } 조정하는 걸 권장 드립니다.</p>
                        <p>분석 날짜 : {sleepData.rdate}</p>


                    </div>
                </div>
            </motion.div>

            {/* 챗봇 답변 */}
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
                        {sleepData.prediction === '수면부족' ?
                            sleepData.rchat
                            :
                            <p>
                                {sleepData.email}님의 생활 패턴과 체성분 분석 결과에 따르면,
                                오늘 수면이 정상일 것으로 예상됩니다. 편안한 밤 되세요.
                            </p>
                        }
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
