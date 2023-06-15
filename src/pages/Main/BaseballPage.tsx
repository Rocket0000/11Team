import React, { useEffect } from "react";
import styled from "styled-components";

import styles from "../../styles/main.module.scss";
import ScheduleBox from "../../components/DetailMain/ScheduleBox";
import ShortsBox from "../../components/DetailMain/ShortsBox";
import CommunityBox from "../../components/DetailMain/CommunityBox";
import RankBox from "../../components/DetailMain/RankBox";

const SoccerPage = () => {
  return (
    <>
      <div className={styles.body}>
        <ScheduleBox category={1} />
        <ShortsBox category={1} />
        <CommunityBox category={1} />
        <RankBox category={1} />
      </div>
    </>
  );
};

export default SoccerPage;
