import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from './Navbar';
import Profile from '../Profile/Profile';

const Header = () => {

    return (
        <HeaderContainer>
            <HeaderTop>
                <HeaderWrap>
                    <NavLink to="/">
                        <Logo>
                            <LogoImg src="/images/logo.png" alt="팬하나로고" />
                            <LogoText>FANHANA</LogoText>
                        </Logo>
                    </NavLink>
                    {/* 비회원, 회원 나중에 따로 구분*/}
                    {/* <Profile currentUser={currentUser} /> */}
                    <div>
                        <NavLink to="/login">
                            <Button>로그인</Button>
                        </NavLink>
                        <NavLink to="/register">
                            <Button>회원가입</Button>
                        </NavLink>
                    </div>
                </HeaderWrap>
            </HeaderTop>
            <Navbar />
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    position: relative;
`

const HeaderTop = styled.div`
    width: 100vw;
    height: 60px;

    @media (max-width: 768px) {
        height: 45px;
    }
`

const HeaderWrap = styled.div`
    padding: 0 162px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        padding: 0 15px;
    }
`

const Button = styled.button`
    all: unset;
    margin-left: 20px;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 16px;

    @media (max-width: 768px) {
        display: none;
    }
`

const Logo = styled.div`
    display: flex;
    align-items: end;
    color: #5546B7;
`

const LogoImg = styled.img`
    width: 25px;
    height: auto;
    @media (max-width: 768px) {
        width: 20px;
    }
`

const LogoText = styled.span`
  font-size: 20px;
  font-weight: bold;
  padding-left: 5px;

  
`;

const NavLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`
