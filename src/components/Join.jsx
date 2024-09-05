import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/join.css'
import Swal from 'sweetalert2';

const Join = () => {

    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const [name, setName] = useState('')
    const nav = useNavigate();

    // 회원가입 함수
    function tryJoinPost() {
        const formData = new FormData();
        formData.append('email', id);
        formData.append('password', pw);
        formData.append('name', name);

        axios({
            url: "http://localhost:8092/api/member/join",
            method: "post",
            data: formData
        })
            .then((res) => {

                if (id.length === 0 || pw.length === 0) {    // id, pw 값이 빈칸일 경우
                    Swal.fire({
                        title: "회원가입 실패",
                        text: "빈칸을 확인해주세요",
                        icon: "error"
                    });
                } else {     // input 값이 들어있을 경우
                    console.log(res)
                    Swal.fire({
                        title: "회원가입 성공!",
                        text: "👏👏",
                        icon: "success"
                    });
                    nav('/login')
                }

            })
    }

    return (
        <div className='join-box'>
            <div className='join-container'>
                <div className='join-title'>
                    Join
                </div>

                <div className='join-content'>
                    <p>아이디</p>
                    <input type='text' onChange={(e) => setId(e.target.value)}
                        className='join-input' placeholder='smhrdtest12' required></input> <br />
                </div>

                <div className='join-content'>
                    <p>비밀번호</p>
                    <input type='password' onChange={(e) => setPw(e.target.value)}
                        className='join-input' placeholder='영어, 숫자 포함 8자 ~ 16자'></input><br />
                </div>

                <div className='join-content'>
                    <p>이름</p>
                    <input onChange={(e) => setName(e.target.value)}
                        className='join-input' placeholder='홍길동'></input><br />
                </div>

                <div>
                    <button className='join-btn' onClick={tryJoinPost}>가입하기</button>
                </div>
            </div>
        </div>
    )
}

export default Join