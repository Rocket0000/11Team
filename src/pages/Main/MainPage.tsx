import React from "react";
import styled from "styled-components";
import axios from "axios";

import styles from "../../styles/main.module.scss";
import ScheduleBox from "../../components/Main/ScheduleBox";
import WeatherBox from "../../components/Main/Weather/WeatherBox";
import RankBox from "../../components/Main/RankBox";
import CommunityBox from "../../components/Main/CommunityBox";
import ShortsBox from "../../components/Main/ShortsBox";

const MainPage = () => {
  return (
    <>
      <div className={styles.body}>
        <ScheduleBox />
        <ShortsBox />
        <CommunityBox />
        <SmContainer>
          <RankBox />
          <WeatherBox />
        </SmContainer>
      </div>
    </>
  );
};

export default MainPage;

const SmContainer = styled.div`
  display: flex;
  width: 404px;
  height: 629px;
  flex-direction: column;
  justify-content: flex-start;
`;
