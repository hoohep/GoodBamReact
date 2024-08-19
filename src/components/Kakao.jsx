import React from 'react'

const Kakao = () => {

    const rest_api_key = '0196bd96b83188ce5806bb730eff40d5';
    const redirect_url = 'http://localhost:3000/kakao'

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_url}&response_type=code`
    const handleLogin = () => {
        window.location.href = kakaoURL
    }

    return (
        <div className="App">
            로그인 전 <br />
            <button type='button' onClick={handleLogin}>로그인하기</button>
        </div>
    );

}

export default Kakao