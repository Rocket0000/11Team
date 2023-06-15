import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserInfoFetcher, { handleWithdraw } from "./UserInfoFetcher";
import Button from "./../../components/common/Button/Button";
import ProfileImg from "./ProfileImg";
import "./../../styles/mypage.css";

const MyInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: "",
    email: "",
    nickname: "",
    phone: "",
    favoriteSport: 0,
    img: 1, // 선택된 아바타의 ID
  });

  //회원정보 수정
  const [editing, setEditing] = useState(false);
  const BASE_URL = "http://localhost:5500";

  const handleNicknameChange = (e: any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      nickname: e.target.value,
    }));
  };

  const handlePhoneChange = (e: any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      phone: e.target.value,
    }));
  };

  const handleFavoriteSportChange = (e: any) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      favoriteSport: parseInt(e.target.value),
    }));
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("토큰이 존재하지 않습니다.");
      }

      const updatedUserInfo = {
        id: userInfo.id,
        nickname: userInfo.nickname,
        phone: userInfo.phone,
        interest: userInfo.favoriteSport,
        img: userInfo.img,
      };

      const response = await axios.put(
        `${BASE_URL}/api/v1/user`,
        updatedUserInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("수정 성공", response.data);
      //window.location.reload();
      setEditing(false);
    } catch (error: any) {
      console.log("수정 실패", error.message);
    }
  };

  const handleFetchSuccess = (fetchedUserInfo: any) => {
    setUserInfo(fetchedUserInfo);
  };

  const handleFetchError = (error: any) => {
    console.log("불러오기 실패", error);
  };

  const handleWithdrawClick = async () => {
    try {
      const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
      if (confirmed) {
        await handleWithdraw(); // UserInfoFetcher 컴포넌트에서 불러온 handleWithdraw 함수 실행
        localStorage.removeItem("accessToken");
        navigate("/login");
        window.location.reload();
      } else {
        console.log("탈퇴 취소");
      }
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    } finally {
      console.log("회원 탈퇴 무사 종료");
    }
  };

  return (
    <>
      <div className="mh500 myInfoDiv">
        <h2 className="pageTitle">유저정보</h2>
        <UserInfoFetcher
          onSuccess={handleFetchSuccess}
          onError={handleFetchError}
        />
        <table className="myinfoTable">
          <tbody>
            <tr>
              <th>이메일</th>
              <td>{userInfo.email}</td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                {editing ? (
                  <input
                    type="text"
                    value={userInfo.nickname}
                    onChange={handleNicknameChange}
                  />
                ) : (
                  userInfo.nickname
                )}
              </td>
            </tr>
            <tr>
              <th>핸드폰</th>
              <td>
                {editing ? (
                  <input
                    type="text"
                    value={userInfo.phone}
                    onChange={handlePhoneChange}
                  />
                ) : (
                  userInfo.phone
                )}
              </td>
            </tr>
            <tr>
              <th>선호종목</th>
              <td>
                {editing ? (
                  <select
                    value={userInfo.favoriteSport}
                    onChange={handleFavoriteSportChange}
                  >
                    <option value="">선호 종목을 선택하세요</option>
                    <option value="0">축구</option>
                    <option value="1">야구</option>
                    <option value="2">롤</option>
                  </select>
                ) : (
                  userInfo.favoriteSport
                )}
              </td>
            </tr>
            {editing && (
              <tr>
                <th>프로필 이미지</th>
                <td>
                  <ProfileImg
                    onAvatarChange={(selectedImage) =>
                      setUserInfo((prevUserInfo) => ({
                        ...prevUserInfo,
                        img: selectedImage.id,
                      }))
                    }
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ width: "150px", margin: "0 0 20px auto" }}>
        {editing ? (
          <Button
            disabled={false}
            purpose="base"
            content="수정사항 저장"
            onClick={handleSaveClick}
          />
        ) : (
          <Button
            disabled={false}
            purpose="base"
            content="회원정보 수정"
            onClick={handleEditClick}
          />
        )}
      </div>
      <div style={{ width: "85px", marginLeft: "auto" }}>
        <Button
          disabled={false}
          purpose="reportComment"
          content="회원탈퇴"
          onClick={handleWithdrawClick}
        />
      </div>
    </>
  );
};

export default MyInfo;
