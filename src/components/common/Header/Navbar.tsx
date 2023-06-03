import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [subNav, setSubNav] = useState({
        show: false,
        category: ''
    });
    const location = useLocation();
    const navigate = useNavigate();

    // 기본 페이지 외에 SubNav 보이게 하기
    useEffect(() => {
        setSubNav(prevState => ({
            ...prevState,
            show: location.pathname !== '/'
        }));
    }, [location]);


    // 경로 확인
    const checkActive = (path: string): boolean => {
        return location.pathname.startsWith(path);
    };

    // 메뉴 클릭 시 SubNav 보이게 하기
    const handleNavClick = (category: string): void => {
        setSubNav({ show: true, category });
    };

    // 경로 이동
    const handleSubNavClick = (path: string): void => {
        navigate(path);
    };

    return (
        <NavContainer>
            <NavWrap>
                <Navul>
                    <NavItem active={location.pathname === '/'}>
                        <NavLink to="/">홈</NavLink>
                    </NavItem>
                    <NavItem active={checkActive('/soccer')}>
                        <NavLink
                            to="/soccer"
                            onClick={() => handleNavClick('soccer')}
                        >
                            축구
                        </NavLink>
                    </NavItem>
                    <NavItem active={checkActive('/baseball')}>
                        <NavLink
                            to="/baseball"
                            onClick={() => handleNavClick('baseball')}
                        >
                            야구
                        </NavLink>
                    </NavItem>
                    <NavItem active={checkActive('/esport')}>
                        <NavLink
                            to="/esport"
                            onClick={() => handleNavClick('esport')}
                        >
                            e-스포츠
                        </NavLink>
                    </NavItem>
                </Navul>
            </NavWrap>

            {subNav.show && (
                <SubNav show={subNav.show}>
                    <NavWrap>
                        <Navul>
                            <NavItem
                                active={checkActive(`/${subNav.category}/페이지명`)}
                                onClick={() => handleSubNavClick(`/${subNav.category}/페이지명`)}
                            >
                                일정/결과
                            </NavItem>
                            <NavItem
                                active={checkActive(`/${subNav.category}/record`)}
                                onClick={() => handleSubNavClick(`/${subNav.category}/record`)}
                            >
                                순위
                            </NavItem>
                            <NavItem
                                active={checkActive(`/${subNav.category}/페이지명`)}
                                onClick={() => handleSubNavClick(`/${subNav.category}/페이지명`)}
                            >
                                게시판
                            </NavItem>
                            <NavItem
                                active={checkActive(`/${subNav.category}/페이지명`)}
                                onClick={() => handleSubNavClick(`/${subNav.category}/페이지명`)}
                            >
                                쇼츠
                            </NavItem>
                        </Navul>
                    </NavWrap>
                </SubNav>
            )}
        </NavContainer>
    );
};
export default Navbar

const NavContainer = styled.nav`
    position: relative;
    width: 100vw;
    height: 60px;
    background-color: #5546B7;
`

const NavWrap = styled.div`
    padding: 0 162px;
    height: 100%;
    margin: 0 auto;
`

const Navul = styled.ul`
    display: flex;
    font-size: 18px;
    height: 100%;
`;

const NavItem = styled.li<{ active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
    font-weight: bold;
    opacity: ${props => props.active ? "1" : "0.5"};
    transition: opacity 0.2s ease-in-out;
    &:first-child {
       padding-left: 0;
    }

    &:hover {
        opacity: 1;
    }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0 15px;

  &:first-child {
            padding: 0;
        }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: 60px;
  }
`;

const SubNav = styled.nav<{ show: boolean }>`
  background-color: #EFEAFC;
  height: ${props => (props.show ? '60px' : '0')};
  animation: ${fadeIn} 0.2s ease-in-out;
  overflow: hidden;
`;
