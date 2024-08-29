import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'; // useLocation 훅 import

const FooterStyle = styled.footer`
    .footer-container {
        display: ${props => props.hide ? 'none' : 'flex'}; /* hide prop이 true일 경우 display: none */
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        color: #e9e9e9;
        height: ${props => props.height || '50px'}; /* height를 props로 설정, 기본값은 50px */
        width: 100%;
        font-size: 14px;
        background-color: transparent; /* 배경색을 투명하게 설정 */
    }
`;

const Footer = ({ height }) => {
  const location = useLocation(); // 현재 경로를 가져오기 위한 useLocation 훅 사용

  // 현재 경로가 '/list'일 경우 Footer를 숨김
  const isListPage = location.pathname === '/list';

  return (
    <FooterStyle height={height} hide={isListPage}>
      <div className="footer-container">
        COPYRIGHT © 2024 GOODBAM, ALL RIGHTS RESERVED
      </div>
    </FooterStyle>
  );
}

export default Footer;
