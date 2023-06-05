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
        // '/'기준으로 배열 만들고 첫번째를 카테고리로 설정
        const pathArray = location.pathname.split('/');
        const category = pathArray.length > 1 ? `/${pathArray[1]}` : '';

        // 코드 리뷰 반영. location.pathname이 빈 문자열인지도 확인하기
        setSubNav({
            show: location.pathname !== '' && location.pathname !== '/',
            category,
        });
    }, [location.pathname]);

    // 경로 확인
    const checkActive = (path: string): boolean => {
        return location.pathname.startsWith(path);
    };

    // 메뉴 클릭 시 SubNav 보이게 하기
    const handleNavClick = (category: string): void => {
        navigate(`/${category}`);
    };

    // 경로 이동
    const handleSubNavClick = (subPath: string): void => {
        const newPath = `${subNav.category}${subPath}`;
        navigate(newPath);
    };

    return (
        <NavContainer>
            <NavWrap>
                <Navul>
                    <NavItem active={location.pathname === '/'} onClick={() => handleNavClick('')}>
                        <NavLink to="/">홈</NavLink>
                    </NavItem>
                    <NavItem active={checkActive('/soccer')} onClick={() => handleNavClick('soccer')}>
                        <NavLink to="/soccer">
                            축구
                        </NavLink>
                    </NavItem>
                    <NavItem active={checkActive('/baseball')} onClick={() => handleNavClick('baseball')}>
                        <NavLink to="/baseball">
                            야구
                        </NavLink>
                    </NavItem>
                    <NavItem active={checkActive('/esport')} onClick={() => handleNavClick('esport')}>
                        <NavLink to="/esport">
                            e-스포츠
                        </NavLink>
                    </NavItem>
                </Navul>
            </NavWrap>

            <SubNav show={subNav.show}>
                <NavWrap>
                    <Navul>
                        <NavItem
                            active={checkActive(`${subNav.category}/페이지명`)}
                            onClick={() => handleSubNavClick('/페이지명')}
                        >
                            일정/결과
                        </NavItem>

                        <NavItem
                            active={checkActive(`${subNav.category}/record`)}
                            onClick={() => handleSubNavClick('/record')}
                        >
                            순위
                        </NavItem>
                        <NavItem
                            active={checkActive(`${subNav.category}/페이지명`)}
                            onClick={() => handleSubNavClick('/페이지명')}
                        >
                            게시판
                        </NavItem>
                        <NavItem
                            active={checkActive(`${subNav.category}/페이지명`)}
                            onClick={() => handleSubNavClick('/페이지명')}
                        >
                            쇼츠
                        </NavItem>
                    </Navul>
                </NavWrap>
            </SubNav>
        </NavContainer>
    );
};
export default Navbar

const NavContainer = styled.nav`
    width: 100vw;
    min-height: 60px;
    background-color: #5546B7;
`

const NavWrap = styled.div`
    padding: 0 162px;
    height: 60px;
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
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  animation: ${fadeIn} 0.2s ease-in-out;
`;
