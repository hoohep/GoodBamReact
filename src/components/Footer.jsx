import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.footer`
    .footer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        color: #e9e9e9;
        height: 50px; /* 적절한 높이 설정 */
        width: 100%; /* 너비를 화면 전체로 설정 */
        position: fixed; /* 푸터를 페이지 하단에 고정 */
        bottom: 0; /* 페이지 하단에 위치 */
        font-size : 14px;
    }
`;

const Footer = () => {
  return (
    <FooterStyle>
        <div className='footer-container'>
            COPYRIGHT © 2024 GOODBAM, ALL RIGHTS RESERVED

        </div>
    </FooterStyle>
  );
}

export default Footer;