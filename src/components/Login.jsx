import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../style/login.css'
import Swal from 'sweetalert2';

const Login = () => {

    const [id, setId] = useState('')
    const [pw, setPw] = useState('')
    const nav = useNavigate();

    // 카카오 API 로그인
    const rest_api_key = '0196bd96b83188ce5806bb730eff40d5';
    const redirect_url = 'http://localhost:3000/kakao'

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
            url: "http://localhost:8092/api/member/login",
            method: "post",
            data: formData
        })
        .then((res) => {
            // console.log(res)
            // 로컬에 토큰 저장
            localStorage.setItem('token', res.data);
            Swal.fire({
                title: "로그인 성공!",
                text: "👏👏",
                icon: "success"
            });
            nav('/')
        })
        .catch(error => {
            console.error('error', error);
            Swal.fire({
                title: "로그인 실패",
                text: "아이디와 비밀번호를 확인해주세요",
                icon: "error"
            });
        });

    }

    return (

        <div>

            <div className='login-title' style={{ color: 'rgb(199 210 254)' }}>
                Login
            </div>

            <div className='login-content'>
                <p>아이디</p>
                <input type="email" onChange={(e) => setId(e.target.value)} 
                className='login-input' placeholder='abcde@smhrd.com' /> <br />
            </div>

            <div className='login-content'>
                <p>비밀번호</p>
                <input type="password" onChange={(e) => setPw(e.target.value)} 
                className='login-input' placeholder='영어, 숫자 포함 8자 ~ 16자' /> <br />
            </div>

            <div>
                <button onClick={tryLoginPost} className='login-btn'>로그인</button> <br />
                <button onClick={handleLogin} className='loginKakao-btn'>카카오 로그인</button><br />
                <div className='join-text'><a href='/join'>회원가입</a></div>
            </div>

        </div>
    )
}

export default Login