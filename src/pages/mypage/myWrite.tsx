import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TableList from "../../components/common/TableList";
import Header from "../../components/common/Header/Header";

import Button from "./../../components/common/Button/Button";

import dummyPosts from "./dummyPosts";

function MyWrite() {
  const [nickname, setNickname] = useState("");
  const [favorite, setFavorite] = useState("");

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      // 가장 최근 회원 정보 가져오기
      const latestUser = parsedUsers[parsedUsers.length - 1];
      setNickname(latestUser.nickname);
      setFavorite(latestUser.favorite);
    }
  }, []);

  // 선호종목 매핑
  interface FavoriteOptions {
    [key: string]: string;
  }
  const favoriteOptions: FavoriteOptions = {
    "0": "축구",
    "1": "야구",
    "2": "롤",
  };

  return (
    <>
      <Header />
      <StyledSection>
        <MyProfile>
          <div className="profileImg"></div>
          <p className="nickname">{nickname}</p>
          <p className="favorite">
            선호종목 : <span>{favoriteOptions[favorite]}</span>
          </p>
          <Button
            disabled={false}
            purpose="base"
            content="로그아웃"
            // onClick={}
          />
        </MyProfile>
        <MyContent>
          <TabMenu />
        </MyContent>
      </StyledSection>
    </>
  );
}

export default MyWrite;

//마이페이지 공통
const StyledSection = styled.section`
  background-color: #fff;
  padding: 0px 162px;
  margin: 0px auto;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

const MyProfile = styled.div`
  width: 250px;
  text-align: center;
  margin-right: 50px;

  & > div.profileImg {
    background-color: green;
    width: 150px;
    height: 150px;
    margin: 0px auto 15px auto;
    border-radius: 50%;
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
            <TableList show="all" data={dummyPosts}/>
            <TableList show="my" data={dummyPosts}/>
          </Tab>
        )}
        {activeTab === 1 && (
          <Tab label="Tab 2">
            <p>내 동영상</p>
          </Tab>
        )}
        {activeTab === 2 && <Tab label="Tab 3">내정보</Tab>}
      </TabContentWrapper>
    </TabMenuWrapper>
  );
};
