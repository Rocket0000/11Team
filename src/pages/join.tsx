import React, { useState } from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AccountBox, AccountIntro } from "./login";
import "./../styles/login.css";

const JoinPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [favorite, setFavorite] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };

  const handleFavoriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFavorite(e.target.value);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value);
  };

  const handleRegister = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호를 다시 확인해주세요.");
      return;
    }

    //미구현 기능
    //회원가입 성공시 -> 회원가입 성공, 환영합니다 알림창 - 확인 버튼 - 로그인 페이지로 이동
    //회원가입 실패시 -> 회원가입 실패 알림창 - 확인버튼 - 회원가입페이지에서 새로고침
    //이메일 : DB랑 비교해서 중복 여부 체크, 올바른 형식인지 확실히
    //선호종목 : select으로 수정
    //핸드폰 : 숫자만 입력되게
    //비밀번호 : 영문 숫자 혼합형식?

    //디자인 입히기
  };

  return (
    <section>
      <AccountBox login="join">
        <AccountIntro />
        <div className="accountForm">
          <h2 className="title">회원가입</h2>
          {/* ==== 회원가입 정보 입력 영역 : 컴포넌트 완성 후 수정 필요 ==== */}
            <ul>
              <li>
                <p>이메일</p>
                <input type="email" value={email} onChange={handleEmailChange} />
              </li>
              <li>
                <p>비밀번호</p>
                <input type="password" value={password} onChange={handlePasswordChange}/>
              </li>
              <li>
                <p>비밀번호 확인</p>
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </li>
              <li>
                <p>선호종목</p>
                <input type="text" value={favorite} onChange={handleFavoriteChange} />
              </li>
              <li>
                <p>닉네임</p>
                <input type="text" value={nickname} onChange={handleNicknameChange} />
              </li>
              <li>
                <p>핸드폰</p>
                <input type="text" value={phone} onChange={handlePhoneChange} />
              </li>
              <li>
                <p>프로필아바타</p>
                {/* state써서 갤러리 형식으로 구현  */}
                <Gallery />
              </li>
            </ul>
          <button onClick={handleRegister}>회원가입</button>
        </div>
      </AccountBox>
    </section>
  );
};

interface Image {
  id: number;
  thumbnailUrl: string;
  fullImageUrl: string;
  altText: string;
}

const Gallery: React.FC = () => {
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

  const [selectedImage, setSelectedImage] = useState<Image | null>(thumbnailImages[0]);
  const handleThumbnailClick = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <div className="profileSelect">
      <div className="mainImage">
        {selectedImage && (
          <img src={selectedImage.fullImageUrl} alt={selectedImage.altText} />
        )}
      </div>
      <div className="thumbnails">
        {thumbnailImages.map((image: Image) => (
          <img key={image.id} src={image.thumbnailUrl} alt={image.altText}
          style={{
            border: `2px solid ${selectedImage && selectedImage.id === image.id ? "purple" : "white"}`,
          }} onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default JoinPage;
