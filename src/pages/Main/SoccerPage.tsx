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
        <ScheduleBox category={0} />
        <ShortsBox category={0} />
        <CommunityBox category={0} />
        <RankBox category={0} />
      </div>
    </>
  );
};

export default SoccerPage;
