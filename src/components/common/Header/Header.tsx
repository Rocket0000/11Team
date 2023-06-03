import React from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from './Navbar';

const Header = () => {
    return (
        <>
            <HeaderContainer>
                <HeaderWrap>
                    <NavLink to="/">
                        <Logo>
                            <img src="/images/logo.png" alt="" style={{ width: '40px', height: 'auto' }} />
                            <span style={{ fontSize: "24px", fontWeight: "bold", paddingLeft: "5px" }}>FANHANA</span>
                        </Logo>
                    </NavLink>
                    {/* 비회원, 회원 나중에 따로 구분*/}
                    <div>
                        <NavLink to="/login">
                            <Button>로그인</Button>
                        </NavLink>
                        <NavLink to="/register">
                            <Button>회원가입</Button>
                        </NavLink>
                    </div>
                </HeaderWrap>
            </HeaderContainer>
            <Navbar />
        </>

    )
}

export default Header

const HeaderContainer = styled.div`
    width: 100vw;
    height: 80px;
`

const HeaderWrap = styled.div`
    padding: 0 162px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Button = styled.button`
    all: unset;
    margin-left: 20px;
    cursor: pointer;
    padding: 5px 10px;
`

const Logo = styled.div`
    display: flex;
    align-items: end;
    color: #5546B7;
`

const NavLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`