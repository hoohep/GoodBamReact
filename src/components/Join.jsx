import axios from 'axios'
import React, { useState } from 'react'

const Join = () => {

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [name, setName] = useState('')

  function tryJoinPost(){
    const formData = new FormData();
    formData.append('email', id);
    formData.append('password', pw);
    formData.append('name', name);

    axios({ 
        url : "http://localhost:8092/api/member/join",
        method :"post",
        data: formData
    })
    .then((res)=>{
        console.log(res)
    })
}




  return (
    <div>
        <h3>Join</h3>
        아이디 : <input onChange={(e)=>setId(e.target.value)} placeholder='aabcd@smhrd.com'></input><br/>
        비밀번호 : <input onChange={(e)=>setPw(e.target.value)} placeholder='숫자입력'></input><br/>
        이름 : <input onChange={(e)=>setName(e.target.value)}></input><br/>

        <button onClick={tryJoinPost}>회원가입</button>
    </div>
  )
}

export default Join