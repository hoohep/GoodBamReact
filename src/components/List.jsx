import React, { useEffect, useState } from 'react'
import useAuth from '../Hooks/Auth'
import '../style/list.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListMap from './ListMap';


const List = () => {

    useAuth()   // 유효성 검사
    const [sleepList, setSleepList] = useState([]); // 수면 데이터를 저장하는 상태

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
                const data = JSON.stringify(response.data);
                // console.log(data);
                setSleepList(JSON.parse(data));
                console.log(sleepList);
            })
    }, [])

    return (

        <div className='list-container'>

            <div className='list-title'>
                Sleep List
            </div>

            <Link to={'/result'} className='list-link'>
                {sleepList.map((item) => (
                    <ListMap key={item.id} item={item} />
                ))}
            </Link>

        </div>
    )
}

export default List