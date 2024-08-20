import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Redirection = () => {

    //const code = window.location.search;
    const code = new URL(window.location.href).searchParams.get('code');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(code);
        
    });




  return (
        
    <div>
        로그인 후 <br/>


    </div>
  )
}

export default Redirection