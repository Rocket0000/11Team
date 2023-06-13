import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserInfoFetcher = ({ onSuccess, onError }) => {
  const BASE_URL = "http://localhost:5500";

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("토큰이 존재하지 않습니다.");
    }
    const decodedToken = parseJwt(token);
    if (!decodedToken || !decodedToken.user_id) {
      throw new Error("유저 아이디를 찾을 수 없습니다.");
    }
    const userId = decodedToken.user_id;
    console.log("유저 아이디:", userId); //확인용
    console.log("유저 이미지:: ");
    //console.log("유저 토큰:", token); //확인용

    //선호종목 매칭
    const favoriteOptions = {
      0: "축구",
      1: "야구",
      2: "롤",
    };

    axios
      .get(`${BASE_URL}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        const userInfo = {
          id: data.id,
          email: data.email,
          nickname: data.nickname,
          phone: data.phone,
          favoriteSport: favoriteOptions[data.interest], // 숫자에 맞는 선호종목 값 설정
          img: data.img,
        };
        console.log("유저 이미지 id::", userInfo.img);
        onSuccess(userInfo);
      })
      .catch((error) => {
        console.log("불러오기 실패", error);
        onError(error);
      });
  };

  // 토큰 역파싱
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      //console.log("파싱 성공:", jsonPayload); //확인용
      console.log("파싱성공");
      const decodedToken = JSON.parse(jsonPayload);
      //console.log("디코딩된 토큰:", decodedToken); //확인용
      return decodedToken;
    } catch (error) {
      console.log("토큰 역파싱 실패", error);
      return null;
    }
  };
  return null; //렌더링 안해서 null
};

export const handleWithdraw = () => {
  const BASE_URL = "http://localhost:5500";
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("토큰이 존재하지 않습니다.");
    return;
  }

  axios
    .delete(`${BASE_URL}/api/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("회원탈퇴 성공");
      alert("회원탈퇴가 완료되었습니다. 안녕히가세요.");
      return;
    });
};

export default UserInfoFetcher;
//회원탈퇴 후에 catch문 한번더 실행됨
