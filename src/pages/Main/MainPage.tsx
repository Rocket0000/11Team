import React from "react";
import styled from "styled-components";
import axios from "axios";

import ScheduleBox from "../../components/Main/ScheduleBox";
import WeatherBox from "../../components/Main/Weather/WeatherBox";
import RankBox from "../../components/Main/RankBox";
import CommunityBox from "../../components/Main/CommunityBox";
import ShortsBox from "../../components/Main/ShortsBox";

const MainPage = () => {
  //메인페이지 로딩시 게시판 데이터, 쇼츠 데이터 받아옴

  return (
    <>
      <Body>
        <ScheduleBox />
        <ShortsBox />
        <CommunityBox />
        <RankBox />
        <WeatherBox />
      </Body>
    </>
  );
};

export default MainPage;

const Body = styled.div`
  display: flex;
  justify-content: space-around;
  margin: auto;
  padding: 25px;
  flex-wrap: wrap;
  width: 1642px;
`;
