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
        <ScheduleBox category={2} />
        <ShortsBox category={2} />
        <CommunityBox category={2} />
        <RankBox category={2} />
      </div>
    </>
  );
};

export default SoccerPage;
