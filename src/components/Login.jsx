import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [name, setName] = useState('')

  //로그인 유무
  const [auth, setAuth] = useState('false')

  // 카카오 API 로그인
  const rest_api_key = '0196bd96b83188ce5806bb730eff40d5';
  const redirect_url = 'http://localhost:3000/kakao'

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }

  // 로그인
  function tryLoginPost(){
    const formData = new FormData();
    formData.append('id', id);
    formData.append('password', pw);

    axios({
      url : "http://localhost:8092/api/member/login",
      method : "post",
      data: formData
    })
    .then((res)=>{
      console.log(res)
      // sessionStorage.setItem('token', res.data);
    })
    .catch(error => {
      console.error('error', error);
  });

  }


  return (
    <div className="login-container">
      <div className='login-title'>
        <h2>아이디와 비밀번호를 입력해주세요</h2>
      </div>
        아이디 <input type="email" onChange={(e)=>setId(e.target.value)} placeholder='abcde@smhrd.com'/> <br/>
        비밀번호 <input type="password" onChange={(e)=>setPw(e.target.value)} placeholder='영어, 숫자 포함 8자 ~ 16자'/> <br/>

        <button onClick={tryLoginPost} className='login-btn'><Link to={'/'}>로그인하기</Link></button> <br/>
        <button onClick={handleLogin} className='login-btn'>카카오로그인</button><br/>
        <button className='join-btn'><Link to={'/join'}>회원가입</Link></button>
    </div>
  )
}

export default Login