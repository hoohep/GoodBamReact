import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../style/login.css'


const Login = () => {

    let nav = useNavigate();

    const [id, setId] = useState('')
    const [pw, setPw] = useState('')

    //로그인 유무
    // const [token, setToken] = useState('')

    // 카카오 API 로그인
    const rest_api_key = '0196bd96b83188ce5806bb730eff40d5';
    const redirect_url = 'http://localhost:3000/kakao'

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`
    const handleLogin = () => {
        window.location.href = kakaoURL
    }

    // 로그인
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
            nav('/')    
        })
        .catch(error => {
            console.error('error', error);
        });

    }

    return (

        <>

            <div className='login-title'>
                Login
            </div>

            <div className='login-content'>
                <p>아이디</p>
                <input type="email" onChange={(e) => setId(e.target.value)} placeholder='abcde@smhrd.com' /> <br />
            </div>

            <div className='login-content'>
                <p>비밀번호</p>
                <input type="password" onChange={(e) => setPw(e.target.value)} placeholder='영어, 숫자 포함 8자 ~ 16자' /> <br />
            </div>

            <div>
                <button onClick={tryLoginPost} className='login-btn'>로그인하기</button> <br />
                <button onClick={handleLogin} className='loginKakao-btn'>카카오 로그인</button><br />
                <button className='join-btn'><a href='/join'>회원가입</a></button>
            </div>

        </>
    )
}

export default Login