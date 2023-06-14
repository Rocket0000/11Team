import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from './Navbar';
import Profile from '../Profile/Profile';
import axios from 'axios';


interface User {
    nickname: string;
    img: string;
}

interface NavbarWrapperProps {
    id: string;
    isFixed: boolean;
}

// 로컬스토리지에서 id 값 가져오기
const id = localStorage.getItem("id");

const Header = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const url = "http://localhost:5500/api/v1";

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get(`${url}/user/${id}`);
                const data = res.data;

                const user = {
                    nickname: data.nickname,
                    img: data.img,
                };
                setCurrentUser(user);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const navbar = document.getElementById('navbar');

            if (navbar) {
                if (scrollPosition > 0 && scrollPosition >= navbar.offsetTop) {
                    setIsNavbarFixed(true);
                } else {
                    setIsNavbarFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

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
                    {currentUser ? (
                        <Profile currentUser={currentUser} />
                    ) : (
                        <div>
                            <NavLink to="/login">
                                <Button isLogin>로그인</Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button>회원가입</Button>
                            </NavLink>
                        </div>
                    )}
                </HeaderWrap>
            </HeaderTop>
            <NavbarWrapper id="navbar" isFixed={isNavbarFixed}>
                <Navbar />
            </NavbarWrapper>
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

    @media (max-width: 1024px) {
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

    @media (max-width: 1024px) {
        padding: 0 15px;
    }
`

const Button = styled.button<{ isLogin?: boolean }>`
    all: unset;
    margin-left: 20px;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 16px;

    @media (max-width: 1024px) {
        display: ${({ isLogin }) => (isLogin ? 'block' : 'none')};
        font-size: 14px;
        margin-left: 0;
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
    @media (max-width: 1024px) {
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

const NavbarWrapper = styled.div<NavbarWrapperProps>`
@media (max-width: 1024px) {
    ${({ isFixed }) =>
        isFixed
            ? `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  `
            : `
    position: static;
  `}
    }
`;