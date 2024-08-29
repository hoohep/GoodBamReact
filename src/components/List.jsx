import React, { useEffect, useState } from 'react';
import useAuth from '../Hooks/Auth';
import '../style/list.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ListMap from './ListMap';
import img1 from '../assets/imogi1.png';

const List = () => {
    useAuth();   // 유효성 검사
    
    const nav = useNavigate(); // 페이지 이동을 위한 navigate 훅

    // Footer 스타일 정의
    const Footer = styled.footer`
        position: fixed;
        bottom: 0;
        left: 0;  /* 화면 왼쪽 끝으로부터 위치를 설정 */
        width: 100%;
        font-size: 14px;
        background-color: transparent;
        color: #fff;
        text-align: center; /* 텍스트를 중앙 정렬 */
        padding: 1em 0;
        box-sizing: border-box; /* 패딩을 포함하여 폭을 계산 */
    `;

    const [sleepList, setSleepList] = useState(null); // 수면 데이터를 저장하는 상태, 초기값을 null로 설정
    const [error, setError] = useState(null); // 오류를 저장하는 상태


    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchSleepList = async () => {
            try {
                // 토큰 가져오기
                const token = localStorage.getItem('token');

                // API 호출을 통해 수면 데이터 가져오기
                const response = await axios.get("http://localhost:8092/resultList", {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                // 성공적으로 데이터를 가져오면 상태 업데이트
                setSleepList(response.data);
                setError(null); // 오류를 초기화합니다.
            } catch (err) {
                // 오류 발생 시 상태 업데이트
                setError(err.message || "서버에서 데이터를 가져오는 데 실패했습니다.");
                console.error("API 호출 오류:", err);
            }
        };

        fetchSleepList();
    }, []);

    // 특정 항목 클릭 시 Result 페이지로 이동하며 데이터 전달
    const handleItemClick = (item) => {
        nav('/result', { state: { sleepData: item } });
    };

    return (
        <div className='list-container'>
            <div className='list-title'>
                Sleep List
            </div>
            <div className='list-menu'>
            {error ? 
            (
                <div className='error-message'>{error}</div>
            ) 
            : 
            (
                // 데이터가 null이거나 빈 배열인 경우 메시지를 표시합니다.
                sleepList === null ? (
                    <div className='no-data-message'>
                        <img src={img1} />
                        기록된 수면 데이터가 없습니다.
                    </div>
                ) : sleepList.length === 0 ? (
                    
                    <div className='no-data-message'>
                        <img src={img1} />
                        기록된 수면 데이터가 없습니다.
                    </div>
                ) : (
                    
                    sleepList.map((item) => (
                        <div key={item.id} onClick={() => handleItemClick(item)}>
                            <ListMap item={item} />
                        </div>
                    ))
                )
            )}
            <Footer>
            COPYRIGHT © 2024 GOODBAM, ALL RIGHTS RESERVED
            </Footer>
            </div>
        </div>
    );
};

export default List;