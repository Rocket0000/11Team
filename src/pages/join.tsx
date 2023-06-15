import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AccountBox, AccountIntro } from "./login";
import "./../styles/login.css";

import Button from "./../components/common/Button/Button";
import Input from "./../components/common/Input";
import ProfileImg from "./mypage/ProfileImg";

const JoinPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interest, setInterest] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarId, setAvatarId] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = () => {
    axios
      .post("http://localhost:5500/api/v1/auth/register", {
        email,
        password,
        interest,
        nickname,
        phone,
        img: avatarId,
        role: 0,
      })
      .then((response) => {
        console.log("회원가입 성공");
        alert("회원가입이 완료되었습니다. 환영합니다!");
        //확인용 [시작]
        // console.log("이메일:", email);
        // console.log("비밀번호:", password);
        // console.log("선호종목:", interest);
        // console.log("닉네임:", nickname);
        // console.log("핸드폰:", phone);
        // console.log("아바타 ID:", avatarId);
        //확인용 [끝]
        navigate("/login");
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호를 다시 확인해주세요.");
      return;
    }

    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      interest === "" ||
      nickname === "" ||
      phone === "" ||
      avatarId === null
    ) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }
    registerUser();
  };

  interface Image {
    id: number;
    thumbnailUrl: string;
    fullImageUrl: string;
    altText: string;
  }
  const handleAvatarChange = (selectedImage: Image) => {
    setAvatarId(selectedImage.id);
  };

  return (
    <>
      <section style={{ padding: "20px 0" }}>
        <AccountBox login="join">
          <AccountIntro />
          <div className="accountForm">
            <h2 className="title" style={{ marginBottom: "15px" }}>
              회원가입
            </h2>
            <StyledArticle>
              <ul>
                <li>
                  <p className="inputField">이메일</p>
                  <Input type="email" value={email} onChange={setEmail} />
                  {errorMessage && errorMessage.includes("이메일") && (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                  )}
                </li>
                <li>
                  <p className="inputField">비밀번호</p>
                  <Input
                    type="password"
                    value={password}
                    onChange={setPassword}
                  />
                </li>
                <li>
                  <p className="inputField">비밀번호 확인</p>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                  />
                  {errorMessage && errorMessage.includes("비밀번호") && (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                  )}
                </li>
                <li>
                  <p className="inputField">선호종목</p>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  >
                    <option value="">선호 종목을 선택하세요</option>
                    <option value="0">축구</option>
                    <option value="1">야구</option>
                    <option value="2">롤</option>
                  </select>
                </li>
              </ul>
              <ul>
                <li>
                  <p className="inputField">닉네임</p>
                  <Input type="text" value={nickname} onChange={setNickname} />
                </li>
                <li>
                  <p className="inputField">핸드폰</p>
                  <Input type="text" value={phone} onChange={setPhone} />
                </li>
                <li>
                  <p className="inputField">프로필아바타</p>
                  <ProfileImg onAvatarChange={handleAvatarChange} base={true} />
                </li>
              </ul>
            </StyledArticle>
            <div
              style={{
                width: "300px",
                height: "40px",
                margin: "0px auto 20px auto",
              }}
            >
              <Button
                disabled={false}
                purpose="base"
                content="회원가입"
                onClick={handleRegister}
              />
            </div>
            <p className="goJoin">
              이미 회원이세요? <Link to="/login">로그인</Link>
            </p>
          </div>
        </AccountBox>
      </section>
    </>
  );
};

//입력폼 스타일드 컴포넌트
const StyledArticle = styled.article`
  display: flex;
  flex-wrap: wrap;

  & > ul {
    width: 50%;
    padding: 20px;
    box-sizing: border-box;

    li {
      position: relative;
      margin-bottom: 25px;
    }

    li:last-child {
      margin-bottom: 0;
    }

    p.inputField {
      color: #28293d;
      margin-bottom: 5px;
    }

    input {
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid rgb(199, 201, 217);
      border-radius: 4px;
      width: 100%;
      width: calc(100% - 1px);
      box-sizing: border-box;
    }

    select {
      width: 100%;
      padding: 10px 16px;
      font-size: 14px;
      border: 1px solid rgb(199, 201, 217);
      border-radius: 4px;
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: -15px;
  left: 5px;
`;
export default JoinPage;
