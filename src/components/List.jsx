import React, { useEffect, useState } from 'react'
import useAuth from '../Hooks/Auth'
import '../style/list.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ListMap from './ListMap';
import data from '../json/resultList.json';


const List = () => {
    const nav = useNavigate();

    const [sleepList, setSleepList] = useState(null); // 수면 데이터를 저장하는 상태

    useAuth()   // 유효성 검사
    
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
            const data = response.data;
            console.log('list:'+response.data);
            
            if (!data) {
                setSleepList(null); // 데이터가 없으면 null로 설정
            } else {
                setSleepList(data); // 데이터를 상태에 저장
            }
            console.log('data:'+data);
            
        })



    }, [nav])

    return (
        
        <div className='list-container'>

            <div className='list-title'>
                Sleep List
            </div>

            <Link to='/result' className='list-link'>
                {data.list.map((item) => (
                    <ListMap key={item.no} item={item} />
                ))}
            </Link>



            {/* <div className='list-content'>
            <li>2024년 7월 10일</li>
            <li><FaExclamationCircle style={{width:'24px',height:'24px', color:'#333333'}}/></li>
          </div> */}

            {/* <div className='list-content'>
          <li>2024년 6월 08일</li>
          <li><FaExclamationCircle style={{width:'24px',height:'24px', color:'#333333'}}/></li>
        </div>
        
        <div className='list-content'>
          <li>2024년 5월 16일</li>
          <li><FaExclamationCircle style={{width:'24px', height:'24px', color:'#333333'}}/></li>
        </div> */}

        </div>
    )
}

export default List