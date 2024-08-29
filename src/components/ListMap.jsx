import React from 'react'
import { FaExclamationCircle } from "react-icons/fa";
import '../style/list.css'

const ListMap = ({item}) => {
    
  return (
    <div>
        <div className='list-content'>
            <li>{item.rdate}</li>
            <li><FaExclamationCircle style={{width:'24px',height:'24px', color:'#333333'}}/></li>
          </div>
    </div>
  )
}

export default ListMap