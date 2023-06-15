import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [subNav, setSubNav] = useState({
    show: false,
    category: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // 기본 페이지 외에 SubNav 보이게 하기
  useEffect(() => {
    // '/'기준으로 배열 만들고 첫번째를 카테고리로 설정
    const pathArray = location.pathname.split("/");
    const category = pathArray.length > 1 ? `/${pathArray[1]}` : "";

    // 아래 카테고리만 허용
    const categories = ["/soccer", "/baseball", "/esport"];
    setSubNav({
      show:
        location.pathname !== "" &&
        location.pathname !== "/" &&
        categories.includes(category),
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
          <NavItem
            active={location.pathname === "/"}
            onClick={() => handleNavClick("")}
          >
            <NavLink to="/">홈</NavLink>
          </NavItem>
          <NavItem
            active={checkActive("/soccer")}
            onClick={() => handleNavClick("soccer")}
          >
            <NavLink to="/soccer">축구</NavLink>
          </NavItem>
          <NavItem
            active={checkActive("/baseball")}
            onClick={() => handleNavClick("baseball")}
          >
            <NavLink to="/baseball">야구</NavLink>
          </NavItem>
          <NavItem
            active={checkActive("/esport")}
            onClick={() => handleNavClick("esport")}
          >
            <NavLink to="/esport">e-스포츠</NavLink>
          </NavItem>
          <NavItem
            active={checkActive("/stadium")}
            onClick={() => handleNavClick("stadium")}
          >
            <NavLink to="/stadium">경기장</NavLink>
          </NavItem>
        </Navul>
      </NavWrap>

      <SubNav show={subNav.show}>
        <SubWrap>
          <Navul>
            <SubNavItem
              active={checkActive(`${subNav.category}/schedule`)}
              onClick={() => handleSubNavClick("/schedule")}
            >
              일정/결과
            </SubNavItem>

            <SubNavItem
              active={checkActive(`${subNav.category}/record`)}
              onClick={() => handleSubNavClick("/record")}
            >
              순위
            </SubNavItem>
            <SubNavItem
              active={checkActive(`${subNav.category}/notice`)}
              onClick={() => handleSubNavClick("/notice")}
            >
              게시판
            </SubNavItem>
            <SubNavItem
              active={checkActive(`${subNav.category}/페이지명`)}
              onClick={() => handleSubNavClick("/페이지명")}
            >
              쇼츠
            </SubNavItem>
          </Navul>
        </SubWrap>
      </SubNav>
    </NavContainer>
  );
};
export default Navbar;

const NavContainer = styled.nav`
  width: 100%;
  min-height: 50px;
  background-color: #5546b7;

  @media (max-width: 768px) {
    min-height: 40px;
  }
`;

const NavWrap = styled.div`
  padding: 0 162px;
  height: 60px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 0 15px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    height: 48px;
    overflow-y: hidden;
    white-space: nowrap;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SubWrap = styled(NavWrap)`
  height: 50px;

  @media (max-width: 768px) {
    height: 40px;
  }
`;

const Navul = styled.ul`
  display: flex;
  font-size: 16px;
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
  opacity: ${(props) => (props.active ? "1" : "0.5")};

  transition: opacity 0.2s ease-in-out;

  &:first-child {
    padding-left: 0;
  }

  &:hover {
    opacity: 1;
  }
`;

const SubNavItem = styled(NavItem)<{ active: boolean }>`
  font-weight: ${(props) => (props.active ? "bold" : "inherit")};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 0 15px;

  &:first-child {
    padding: 0;
  }
`;

const SubNav = styled.nav<{ show: boolean }>`
  background-color: #efeafc;
  height: ${(props) => (props.show ? "50px" : "0")};
  visibility: ${(props) => (props.show ? "visible" : "hidden")};

  @media (max-width: 768px) {
    height: ${(props) => (props.show ? "40px" : "0")};
    overflow-y: hidden;
    white-space: nowrap;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
