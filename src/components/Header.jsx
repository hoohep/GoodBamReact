import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import styled from "styled-components"

const HeaderStyle = styled.header`
  background-color: #74c0fc;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .nav-logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: #44a8f4;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;


const Header = () => {

    // 토글 state 선언
    const [isToggleOpen, setIsToggleOpen] = useState(false)

    // 토글버튼 함수
    const handleToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen) // True
    }

    return (
        <>
            <HeaderStyle>
                <div className='nav-logo'>
                    <Link to={"/"} className='nav-logo-link'>굿밤</Link>
                </div>

                {/* 토글 메뉴 리스트 */}
                <NavMenu isToggleOpen={isToggleOpen}>
                    <li>
                        <Link to={'/sleep'} className='nav-menu-list'>
                            수면분석
                        </Link>
                    </li>
                    <li>
                        <Link to={'/list'} className='nav-menu-list'>
                            전체기록보기
                        </Link>
                    </li>

                    <li>
                        <Link to={'/login'} className='nav-menu-list'>
                            로그인
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className='nav-menu-list'>
                            로그아웃
                        </Link>
                    </li>

                </NavMenu>
                <FaBars className='menuToggleBtn' onClick={handleToggleOpen} />
            </HeaderStyle>
        </>
    )
}

export default Header