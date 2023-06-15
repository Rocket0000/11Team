import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import styles from "../../styles/main.module.scss";
import { Link } from "react-router-dom";

// @ts-expect-error
const VideoContainer = ({ data }) => {
  return (
    <>
      {data.map((video: any) => {
        return (
          <Link to={`/shorts?id=${video.id}`}>
            <VideoBox key={video.id}>
              <Video src={video.src} />
              <VideoTitle>{video.title}</VideoTitle>
            </VideoBox>
          </Link>
        );
      })}
    </>
  );
};

const ShortsBox = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getShortsData = async () => {
      try {
        const res = await axios.get(`http://localhost:5500/api/v1/shorts`);
        const cutData = res.data.data.slice(0, 4);
        setData(cutData);
      } catch (error) {
        console.error("비디오데이터 불러오는거 실패함", error);
      }
    };
    getShortsData();
  }, []);

  return (
    <>
      <ShortsContainer>
        <div className={styles.title}>쇼츠</div>
        <Body>
          <VideoContainer data={data} />
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
  border: 2.5px solid #c5b5f1;
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
