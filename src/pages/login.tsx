import React, { useState, useEffect } from "react";
import "./../styles/login.css";
import styled from "styled-components";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import userData from "./userData";
import Input from "./../components/common/Input";
import Button from "./../components/common/Button/Button";

interface AccountBox {
  login: string;
}

export let AccountBox = styled.div<AccountBox>`
  width: ${(props) => (props.login === "login" ? "950px" : "1250px")};
  height: 600px;
  display: flex;
  left: ${(props) =>
    props.login === "login" ? "calc(50% - 475px)" : "calc(50% - 625px)"};
  box-sizing: border-box;
  box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.25);
  background-color: #fff;
  magin: 0 auto;
  position: relative;
};
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:5500/api/v1/auth/logIn", { email, password })
      .then((response) => {
        // 로그인 성공
        const accessToken = response.data.data.userToken.accessToken;
        const refreshToken = response.data.data.userToken.refreshToken;

        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        } else {
          //토큰값 없으면
          console.log("토큰 값이 없습니다.");
        }
        console.log("로그인 되었습니다.");
        alert('로그인 성공! 환영합니다!');
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        //로그인 실패
        alert("잘못된 계정 또는 존재하지 않는 계정입니다.");
        window.location.reload();
      });
  };

  return (
    <>
      <section style={{ padding: "20px 0" }}>
        <AccountBox login="login">
          <AccountIntro />
          <div className="accountForm">
            <h2 className="title">로그인</h2>
            <article style={{ marginBottom: "30px" }}>
              <p style={{ marginBottom: "15px" }}>이메일</p>
              <Input type="text" value={email} onChange={handleEmailChange} />
              <p style={{ margin: "30px 0 15px 0" }}>비밀번호</p>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </article>
            <div style={{ width: "100%", height: "40px", margin: "0 auto 15px auto" }}>
              <Button
                disabled={false}
                purpose="base"
                content="로그인"
                onClick={handleLogin}
              />
            </div>
            <p className="goJoin">
              아직 회원이 아니세요? <Link to="/join">회원가입</Link>
            </p>
          </div>
        </AccountBox>
      </section>
    </>
  );
};

export function AccountIntro() {
  return (
    <div className="accountIntro">
      <img
        className="logo"
        src={process.env.PUBLIC_URL + "/images/logo.png"}
        alt="임시이미지"
      />
      <p className="siteName">팬하나</p>
      <p className="grey">진정한 스포츠 팬들을 위한 커뮤니티</p>
      <p>
        팬하나에 오신것을 환영합니다.
        <br />
        다양한 소식과 경기 결과를 한눈에 보실 수 있는 팬하나!
        <br />
        로그인 하시면 더 많은 기능을 이용하실 수 있습니다.
      </p>
    </div>
  );
}

export default LoginPage;
