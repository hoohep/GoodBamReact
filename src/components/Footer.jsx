import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.footer`
    .footer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        color: #333; /* 글자색 설정 */
        height: 60px; /* 적절한 높이 설정 */
        width: 100%; /* 너비를 화면 전체로 설정 */
        position: fixed; /* 푸터를 페이지 하단에 고정 */
        bottom: 0; /* 페이지 하단에 위치 */
    }
`;

const Footer = () => {
  return (
    <FooterStyle>
        <div className='footer-container'>
            Copyright © 2024 Backpackr All right reserved.
        </div>
    </FooterStyle>
  );
}

export default Footer;