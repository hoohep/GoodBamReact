import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import Swal from 'sweetalert2';
import axios from 'axios'


const HeaderStyle = styled.header`
  background-color: navy;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .nav-logo {
    padding: 0 12px;
  }

  .nav-logo img {
    top: 10px;
  }

  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 20px;
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

  const nav = useNavigate();

  // 토글 state 선언
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  // 토글 버튼 핸들러
  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen) // True
  }

  // 카카오 회원정보
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // 로그인 유무
  const [isLogin, setIsLogin] = useState(false);

  // 토큰 관리
  const token = localStorage.getItem('token');

  // 로그인 상태를 확인하고 토큰 넣는 함수
  const checkLoginStatus = () => {
    setIsLogin(!!token)
  }

  // 렌더링 될 때마다 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }); // 렌더링 될 때 마다 돌려야하므로 []없애기

  // 로그아웃 핸들러
  const handleLogout = () => {
    if (token) {  //일반로그아웃
      // 토큰 삭제
      localStorage.removeItem('token')

      //로그아웃 후 로그인 상태를 다시 확인
      checkLoginStatus();

      Swal.fire({
        title: "안녕히가세요👋",
        text: "로그아웃 되었습니다.",
        icon: "warning"
      });

      nav('/')
    }
  }
  return (
    <>
      <HeaderStyle>
        <div className='nav-logo'>
          <Link to={"/"} className='nav-logo-link'><img src={logo} alt='logo' /></Link>
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
          {!isLogin ?
            <li>
              <Link to={'/login'} className='nav-menu-list'>
                로그인
              </Link>
            </li>
            :
            <li>
              <Link to={'/'} className='nav-menu-list' onClick={handleLogout}>
                로그아웃
              </Link>
            </li>
          }
        </NavMenu>
        <FaBars className='menuToggleBtn' onClick={handleToggleOpen} />
      </HeaderStyle>
    </>
  )

}


export default Header;