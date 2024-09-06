import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../style/login.css'
import Swal from 'sweetalert2';
import { FaComment } from "react-icons/fa";


const Login = () => {

    const nav = useNavigate();
    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    // 카카오 API 인가코드 요청
    const rest_api_key = process.env.REACT_APP_KAKAO_API_KEY;

    // const redirect_url = 'http://localhost:3000/kakao'
    const redirect_url = 'https://springreact-bqaya4buech6gdcm.koreacentral-01.azurewebsites.net/kakao'
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`

    const handleLogin = () => {
        window.location.href = kakaoURL
    }

    // 로그인 실행 함수
    function tryLoginPost() {
        const formData = new FormData();
        formData.append('email', id);
        formData.append('password', pw);

        axios({
            url: "https://goodbamspring-g7eqehcuaba3ewez.koreacentral-01.azurewebsites.net/api/member/login",
            method: "post",
            data: formData
        })
            .then((res) => {

                if (id.length === 0 || pw.length === 0) {  // id, pw가 빈칸일 시
                    // console.log('빈칸을 채우시오');
                    Swal.fire({
                        title: "로그인 실패",
                        text: "빈칸을 확인해주세요",
                        icon: "error"
                    });

                } else {   //로그인 성공 시
                    // console.log(res)
                    // 로컬에 토큰 저장
                    localStorage.setItem('token', res.data);
                    Swal.fire({
                        title: "로그인 성공!",
                        text: "👏👏",
                        icon: "success"
                    });
                    nav('/')
                }

            })
            .catch(error => {
                console.error('error', error);
                Swal.fire({
                    title: "로그인 실패",
                    text: "아이디와 비밀번호를 확인해주세요",
                    icon: "error"
                });
                nav('/')
            });
    }

    return (
        <div className='login-box'>
            <div className='login-container'>

                <div className='login-title'>
                    Login
                </div>

                <div className='login-content'>
                    <p>아이디</p>
                    <input
                        type="text"
                        onChange={(e) => setId(e.target.value)}
                        className='login-input'
                        placeholder='아이디를 입력하세요'
                    /> <br />
                </div>

                <div className='login-content'>
                    <p>비밀번호</p>
                    <input
                        type="password"
                        onChange={(e) => setPw(e.target.value)}
                        className='login-input'
                        placeholder='영어, 숫자 포함 8자 ~ 16자'
                    /> <br />
                </div>

                <div>
                    <button onClick={tryLoginPost} className='login-btn'>로그인</button> <br />
                    <button onClick={handleLogin} className='loginKakao-btn'><FaComment style={{ marginRight: '10px' }} />카카오 로그인</button><br />
                    <Link to='/join' className='join-text'>회원가입</Link>
                </div>

            </div>
        </div>
    )
}

export default Login