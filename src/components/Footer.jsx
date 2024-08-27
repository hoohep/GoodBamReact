import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.footer`
    .footer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        color: #e9e9e9;
        height: 50px;
        width: 100%;
        font-size: 14px;
        background-color: transparent; /* 배경색을 투명하게 설정 */
    }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-container">
        COPYRIGHT © 2024 GOODBAM, ALL RIGHTS RESERVED
      </div>
    </FooterStyle>
  );
}

export default Footer;
