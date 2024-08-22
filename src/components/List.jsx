import React from 'react'
import useAuth from '../Hooks/Auth'
import { FaExclamationCircle } from "react-icons/fa";
import '../style/list.css'

const List = () => {
  useAuth()

  return (
    <div className='list-container'>
      
        <div className='list-content'>
          <li>2024년 7월 10일</li>
          <li><FaExclamationCircle style={{width:'24px',height:'24px', color:'#666666'}}/></li>
        </div>
        
        <div className='list-content'>
          <li>2024년 6월 08일</li>
          <li><FaExclamationCircle style={{width:'24px',height:'24px', color:'#666666'}}/></li>
        </div>
        
        <div className='list-content'>
          <li>2024년 5월 16일</li>
          <li><FaExclamationCircle style={{width:'24px', height:'24px', color:'#666666'}}/></li>
        </div>
      
    </div>
  )
}

export default List