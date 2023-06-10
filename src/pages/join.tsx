import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AccountBox, AccountIntro } from "./login";
import "./../styles/login.css";

import Button from "./../components/common/Button/Button";
import Input from "./../components/common/Input";
import Header from "./../components/common/Header/Header";
import userData from "./userData"; //임시데이터

const JoinPage: React.FC = () => {
  //나중에 하나로 정리하기
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interest, setInterest] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarId, setAvatarId] = useState(1); // 선택된 아바타의 ID
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 회원가입 요청을 보내는 함수
  // 문서좀 제대로 읽기
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
        console.log("이메일:", email);
        console.log("비밀번호:", password);
        console.log("선호종목:", interest);
        console.log("닉네임:", nickname);
        console.log("핸드폰:", phone);
        console.log("아바타 ID:", avatarId);
        navigate("/login");
      })
      .catch((error) => {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const handleRegister = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호를 다시 확인해주세요.");
      return;
    }

    // 이메일 중복 체크
    const emailExists = userData.some((user) => user.email === email);
    if (emailExists) {
      setErrorMessage("이미 등록된 이메일입니다.");
      return;
    }

    // 필수 정보 입력 여부 체크
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      interest === "" ||
      nickname === "" ||
      phone === ""
    ) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    // 회원가입 요청 보내기
    registerUser();
  };

  return (
    <>
      <Header />
      <section>
        <AccountBox login="join">
          <AccountIntro />
          <div className="accountForm">
            <h2 className="title">회원가입</h2>
            <StyledArticle>
              <ul>
                <li>
                  {/* 이메일 입력 */}
                  <p className="inputField">이메일</p>
                  <Input type="email" value={email} onChange={setEmail} />
                  {errorMessage && errorMessage.includes("이메일") && (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                  )}
                </li>
                <li>
                  {/* 비밀번호 입력 */}
                  <p className="inputField">비밀번호</p>
                  <Input
                    type="password"
                    value={password}
                    onChange={setPassword}
                  />
                </li>
                {/* 비밀번호 확인 입력 */}
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
                  {/* 선호종목 입력 */}
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
                  {/* 닉네임 입력 */}
                  <p className="inputField">닉네임</p>
                  <Input type="text" value={nickname} onChange={setNickname} />
                </li>
                <li>
                  {/* 핸드폰 입력 */}
                  <p className="inputField">핸드폰</p>
                  <Input type="text" value={phone} onChange={setPhone} />
                </li>
                <li>
                  {/* 프로필 아바타 입력 */}
                  <p className="inputField">프로필아바타</p>
                  <Gallery
                    onAvatarChange={(selectedImage: Image) =>
                      setAvatarId(selectedImage.id)
                    }
                  />
                </li>
              </ul>
            </StyledArticle>
            <Button
              disabled={false}
              purpose="base"
              content="회원가입"
              onClick={handleRegister}
            />
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

//프로필 사진 선택 관련
interface Image {
  id: number;
  thumbnailUrl: string;
  fullImageUrl: string;
  altText: string;
}

interface GalleryProps {
  onAvatarChange: (selectedImage: Image) => void;
}
const Gallery: React.FC<GalleryProps> = ({ onAvatarChange }) => {
  const thumbnailImages: Image[] = [
    {
      id: 1,
      thumbnailUrl: "/images/profile1.png",
      fullImageUrl: "/images/profile1.png",
      altText: "Image 1",
    },
    {
      id: 2,
      thumbnailUrl: "/images/profile2.png",
      fullImageUrl: "/images/profile2.png",
      altText: "Image 2",
    },
    {
      id: 3,
      thumbnailUrl: "/images/profile3.png",
      fullImageUrl: "/images/profile3.png",
      altText: "Image 3",
    },
    {
      id: 4,
      thumbnailUrl: "/images/profile4.png",
      fullImageUrl: "/images/profile4.png",
      altText: "Image 4",
    },
  ];

  const [selectedImage, setSelectedImage] = useState<Image | null>(
    thumbnailImages[0]
  );

  const handleThumbnailClick = (image: Image) => {
    setSelectedImage(image);
    onAvatarChange(image);
  };

  return (
    <div className="profileSelect">
      <div className="mainImage">
        <img
          src={
            selectedImage
              ? selectedImage.fullImageUrl
              : thumbnailImages[0].fullImageUrl
          }
          alt={
            selectedImage ? selectedImage.altText : thumbnailImages[0].altText
          }
        />
      </div>
      <div className="thumbnails">
        {thumbnailImages.map((image: Image) => (
          <img
            key={image.id}
            src={image.thumbnailUrl}
            alt={image.altText}
            style={{
              border: `2px solid ${
                selectedImage && selectedImage.id === image.id
                  ? "#5F30E2"
                  : "#fff"
              }`,
            }}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default JoinPage;
