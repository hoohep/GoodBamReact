import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const FooterStyle = styled.footer`
    .footer-container {
        display: ${props => props.hide ? 'none' : 'flex'};
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        color: #e9e9e9;
        height: ${props => props.height || '50px'};
        width: 100%;
        font-size: 14px;
        background-color: transparent;

        @media (max-width: 768px) { /* 화면 너비가 768px 이하일 때 적용 */
            font-size: 13px; /* 폰트 사이즈를 13px로 줄임 */
        }

        @media (max-width: 480px) { /* 화면 너비가 480px 이하일 때 적용 */
            font-size: 11px; /* 폰트 사이즈를 11px로 줄임 */
        }
    }
`;

const Footer = ({ height }) => {
  const location = useLocation();

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
