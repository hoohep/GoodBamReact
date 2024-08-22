import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Redirection = () => {

  // const code = window.location.search; // 쿼리스트링(?= 어쩌고)
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 인가 코드
    console.log('인가 코드 :', code);
    
    const formData = new FormData();
    formData.append('code', code);

    axios({
      url: "http://localhost:8092/api/member/kakaologin",
      method: "post",
      //body 에 data 담기
      //1. 데이터 보안
      //2. 데이터 용량의 제한이 없다
      data: formData
    })
    .then((res) => {
      console.log('토큰 :', res.data) // 서버로부터 엑세스 토큰 확인

      // const token = JSON.stringify(res.data, null, 2); // 서버로부터 엑세스 토큰 확인, JSON 형식 변환 후  (데이터, 리플레이서, 2칸 들여쓰기)
      // console.log('토큰 : '+token); 
      
      // state에 저장해 보내는방식
      // navigate('/loginSuccess', { state: { token : res.data} });

      // 액세스 토큰을 localStorage에 저장
      localStorage.setItem('access_token', res.data.access_token);
      // 로그인 성공 페이지로 이동
      navigate('/');
    })
    .catch((err) => {
      console.error('에러 :'+err); // 에러 처리
    });
  }, [navigate]);


  return (

    <div>
      로그인 중입니다 <br />
    </div>
  )
}

export default Redirection