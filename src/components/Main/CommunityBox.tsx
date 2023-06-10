import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import communityData from "./Dummy/communityData.json";

interface Data {
  id: number;
  title: string;
  views: number;
  category: number;
}

const TableHeader = () => {
  return (
    <HeaderTr>
      <th>게시글ID</th>
      <th>제목, 댓글</th>
      <th>조회수</th>
    </HeaderTr>
  );
};

// @ts-expect-error
const BoardBox = ({ data }) => {
  return (
    <BoardContainer>
      <BoardTitle>{data.category}</BoardTitle>
      <Table>
        <TableHeader />
        <PostList data={data.data} />
      </Table>
    </BoardContainer>
  );
};

// @ts-expect-error
const PostList = ({ data }) => {
  return (
    <>
      {data.map((post: any) => {
        return (
          <PostTr key={post.id}>
            <Td>{post.id}</Td>
            <PostTitle>{post.title}</PostTitle>
            <Td>{post.views}</Td>
          </PostTr>
        );
      })}
    </>
  );
};

const CommunityBox = () => {
  const [boardData, setBoardData] = useState([]);

  //메인 게시판 데이터 받아와서 communityData에 저장
  const getBoardData = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/v1/post/main/1");
      setBoardData(res.data);
    } catch (error) {
      console.error("게시판 불러오는거 실패함", error);
    }
  };
  //

  //페이지 로딩시 받아올 데이터
  useEffect(() => {
    getBoardData();
  }, []);

  //카테고리별로 들어옴
  //allData soccerData baseballData eSportsData
  const allData = communityData;

  return (
    <>
      <CommunityContainer>
        <div className={styles.title}>오늘의 커뮤니티</div>
        <Body>
          {allData.map((category, index) => {
            return (
              <PostListContainer key={index}>
                <BoardBox data={category} />
              </PostListContainer>
            );
          })}
        </Body>
      </CommunityContainer>
    </>
  );
};

export default CommunityBox;

const CommunityContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1190px;
  height: 625px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
  margin-top: 20px;
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  width: 1190px;
  height: 550px;
  padding-top: 10px;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 550px;
  height: 250px;
`;

const BoardContainer = styled.div`
  flex-wrap: wrap;
  width: 550px;
  height: 220px;
`;

const BoardTitle = styled.div`
  font-size: 18px;
  width: 100px;
  height: 35px;
  font-weight: 400;
  font-size: 18px;
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 550px;
  height: 200px;
`;

const HeaderTr = styled.tr`
  display: none;
`;

const PostTr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 530px;
  height: 50px;
  border-bottom: 1px solid #cccccc;
`;

const PostTitle = styled.td`
  width: 350px;
`;

const Td = styled.td`
  width: 60px;
`;
