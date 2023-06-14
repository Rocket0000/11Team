import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from './Navbar';
import Profile from '../Profile/Profile';
import axios from 'axios';

interface NavbarWrapperProps {
    id: string;
    isFixed: boolean;
}

interface CurrentUser {
    nickname: string;
    img: string;
}

const Header = () => {
    const token = localStorage.getItem("accessToken");
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>({
        nickname: "",
        img: '',
    });

    const url = "http://localhost:5500/api/v1";

    useEffect(() => {
        const getUserData = async () => {
            if (token) {
                try {
                    const res = await axios.get(`${url}/user`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const data = res.data.data;
                    setCurrentUser({
                        nickname: data.nickname,
                        img: data.img,
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        };
        getUserData();
    }, [token]);


    // 스크롤 이벤트 발생 시 실행. navbar가 상단에 닿으면 고정, 원래 위치로 돌아가면 해제
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
                    {currentUser && token
                        ? isTablet
                            ? <NavLink to="/mypage">
                                <Button>마이페이지</Button>
                            </NavLink>
                            : <Profile currentUser={currentUser} />
                        : <div>
                            <NavLink to="/login">
                                <Button>로그인</Button>
                            </NavLink>
                            {!isTablet &&
                                <NavLink to="/register">
                                    <Button>회원가입</Button>
                                </NavLink>
                            }
                        </div>
                    }
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
    width: 100%;
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

    @media (max-width: 1024px){
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
        padding: 0;
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
`

const NavLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`

// 1024px부터 navbar 고정
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
`