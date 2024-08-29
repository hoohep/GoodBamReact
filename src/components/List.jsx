import React, { useEffect, useState } from 'react'
import useAuth from '../Hooks/Auth'
import '../style/list.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListMap from './ListMap';

const List = () => {

    useAuth()   // 유효성 검사
    const [sleepList, setSleepList] = useState([]); // 수면 데이터를 저장하는 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
    // 서버에서 데이터 가져오기
    useEffect(() => {
        //토큰 가져오기
        const token = localStorage.getItem('token');

        // API 호출을 통해 수면 데이터 가져오기
        axios.get("http://localhost:8092/resultList", {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // const data = JSON.stringify(response.data);
                const data = response.data;
                console.log(data);
                setSleepList(data);
                // setSleepList(JSON.parse(data));
                // console.log(sleepList);
            })
    }, [])

    // 특정 항목 클릭 시 Result 페이지로 이동하며 데이터 전달
    const handleItemClick = (item) => {
        navigate('/result', { state: { sleepData: item } });
    };

    return (
        <div className='list-container'>
            <div className='list-title'>
                Sleep List
            </div>
            <div className='list-menu'>
                {sleepList.map((item) => (
                    <div key={item.id} onClick={() => handleItemClick(item)}>
                        <ListMap item={item} />
                    </div>
                ))}

            </div>
        </div>
    );
};

export default List;