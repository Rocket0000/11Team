import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/common/Button/Button";
import TableList from "../../components/common/TableList";

import UserInfoFetcher from "./UserInfoFetcher";
import MyInfo from "./myInfo";

import MyPostsPage from "./myPostsPage";

const MyWrite = () => {
  const [nickname, setNickname] = useState("");
  const [favorite, setFavorite] = useState("");
  const [profileImg, setProfileImg] = useState(""); // 프로필 이미지 상태 추가
  const navigate = useNavigate();

  const handleFetchSuccess = (userInfo: any) => {
    setNickname(userInfo.nickname);
    setFavorite(userInfo.favoriteSport);
    const imgId = userInfo.img; // 유저의 이미지 ID
    setProfileImg(`/images/profile${imgId}.png`); // 프로필 이미지 경로 설정
  };

  const handleFetchError = (error: any) => {
    console.log("불러오기 실패", error);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
  
    if (confirmLogout) {
      localStorage.removeItem("accessToken");
      alert("안녕히가세요!");
      navigate("/login");
      window.location.reload();
    } else {
      console.log("로그아웃 취소");
    }
  };
  

  useEffect(() => {
    const imgId = localStorage.getItem("profileImgId");
    if (imgId) {
      setProfileImg(`/images/profile${imgId}.png`);
    }
  }, []);

  return (
    <>
      <StyledSection>
        <MyProfile>
          <div
            className="profileImg"
            style={{ backgroundImage: `url(${profileImg})` }}
          ></div>
          <p className="nickname">{nickname}</p>
          <p className="favorite">
            선호종목 : <span>{favorite}</span>
          </p>
          <div style={{ width: 100, height: "40px", margin: "0 auto" }}>
            <Button
              disabled={false}
              purpose="base"
              content="로그아웃"
              onClick={handleLogout}
            />
          </div>
        </MyProfile>
        <MyContent>
          <TabMenu />
        </MyContent>
      </StyledSection>
      <UserInfoFetcher
        onSuccess={handleFetchSuccess}
        onError={handleFetchError}
      />
    </>
  );
};
export default MyWrite;

//마이페이지 공통 스타일
const StyledSection = styled.section`
  background-color: #fff;
  padding: 0px 162px;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const MyProfile = styled.div`
  width: 250px;
  text-align: center;
  margin-right: 50px;

  & > div.profileImg {
    border: 1px solid #eee;
    width: 150px;
    height: 150px;
    margin: 0px auto 15px auto;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  p.nickname {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }

  p.favorite {
    color: #757575;
    font-size: 14px;
    margin-bottom: 20px;
  }

  p.favorite > span {
    color: #333;
  }
`;

const MyContent = styled.div`
  width: calc(100% - 300px);
  box-sizing: border-box;
  display: block;
`;

//탭메뉴
const TabMenuWrapper = styled.div``;
const TabWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #e3e3e3;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: #fff;
  color: ${({ active }) => (active ? "#000" : "#A0A0A0")};
  border: none;
  border-bottom: 5px solid ${({ active }) => (active ? "#5F30E2" : "#fff")};
  font-size: 18px;
  outline: none;
  cursor: pointer;
`;

const TabContentWrapper = styled.div`
  margin-top: 20px;
`;

interface TabProps {
  label: string;
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, children }) => {
  return <div>{children}</div>;
};

const TabMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <TabMenuWrapper>
      <TabWrapper>
        <TabButton active={activeTab === 0} onClick={() => handleTabClick(0)}>
          작성글
        </TabButton>
        <TabButton active={activeTab === 1} onClick={() => handleTabClick(1)}>
          동영상
        </TabButton>
        <TabButton active={activeTab === 2} onClick={() => handleTabClick(2)}>
          회원정보
        </TabButton>
      </TabWrapper>
      <TabContentWrapper>
        {activeTab === 0 && (
          <Tab label="Tab 1">
            <p>작성글 보기</p>
            {/* <TableList show="all" data={dummyPosts} />
            <TableList show="my" data={dummyPosts} /> */}
          </Tab>
        )}
        {activeTab === 1 && (
          <Tab label="Tab 2">
            <p>내 동영상</p>
          </Tab>
        )}
        {activeTab === 2 && (
          <Tab label="Tab 3">
            <MyInfo />
          </Tab>
        )}
      </TabContentWrapper>
    </TabMenuWrapper>
  );
};
