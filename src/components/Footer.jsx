import React from 'react'
import styled from 'styled-components'

const FooterStyle = styled.footer`
    .footer-container{
        display: flex;
        flex-direction: column;
        height: 100vh;
        flex: 1;
    }
`


const Footer = () => {
  return (
    <FooterStyle>
        <div className='footer-container'>
            Copyright © 2024 Backpackr All right reserved.
        </div>
    </FooterStyle>
  )
}

export default Footer