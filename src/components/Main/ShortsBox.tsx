import React, { useEffect } from "react";
import styled from "styled-components";

import styles from "../../styles/main.module.scss";
import shortsData from "./Dummy/shortsData.json";

interface Data {
  id: number;
  user_id: number;
  title: string;
  category: number;
  likes: number;
  views: number;
  src: string;
  created_at: string;
}

// @ts-expect-error
const VideoContainer = ({ data }) => {
  return (
    <>
      {data.map((item: any) => {
        return (
          <VideoBox>
            <Video src={item.src} />
            <VideoTitle>{item.title}</VideoTitle>
          </VideoBox>
        );
      })}
    </>
  );
};

const ShortsBox = () => {
  //데이터를 최신순으로 받아와서
  //recentData에 저장

  const recentData = shortsData;

  return (
    <>
      <ShortsContainer>
        <div className={styles.title}>쇼츠</div>
        <Body>
          <VideoContainer data={recentData} />
        </Body>
      </ShortsContainer>
    </>
  );
};

export default ShortsBox;

const ShortsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1205px;
  height: 540px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 240px;
  height: 430px;
  margin: 10px 10px 10px 15px;
`;

const Video = styled.img`
  width: 217px;
  height: 371px;
  border-radius: 20px;
  background-color: #aaaaaa;
`;

const VideoTitle = styled.div``;
