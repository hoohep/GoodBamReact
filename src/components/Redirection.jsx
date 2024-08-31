import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const Redirection = () => {

  const nav = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code'); // 인가 코드
    console.log('인가 코드 :', code);

    const formData = new FormData();
    formData.append('code', code);

    axios({
      url: "https://goodbamspring-g7eqehcuaba3ewez.koreacentral-01.azurewebsites.net/api/member/kakaologin",
      method: "post",
      //body 에 data 담기
      //1. 데이터 보안
      //2. 데이터 용량의 제한이 없다
      data: formData
    })
      .then((res) => {
        console.log('토큰 :', res.data) // 서버로부터 엑세스 토큰 확인

        // 액세스 토큰을 localStorage에 저장
        localStorage.setItem('token', res.data);

        Swal.fire({
          title: "로그인 성공!",
          text: "👏👏",
          icon: "success"
        });

        // 로그인 성공, 해당 페이지로 이동
        nav('/');
      })
      .catch((err) => {
        console.error('에러 :' + err); // 에러 처리
      });
  }, [nav]);

  return (

    <div>
      카카오 로그인 처리 중입니다. <br />
    </div>
  )
}

export default Redirection