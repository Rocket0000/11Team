import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import { getCategoryName } from "../common/Dropdown";
import TableList from "../common/TableList";
import { Link } from "react-router-dom";

const TableHeader = () => {
  return (
    <HeaderTr>
      <th>게시글ID</th>
      <th>제목, 댓글</th>
      <th>작성자</th>
      <th>조회수</th>
    </HeaderTr>
  );
};

const BoardBox = ({ data, sportsName }: any) => {
  return (
    <BoardContainer>
      <Table>
        <TableHeader />
        <PostList data={data} sportsName={sportsName} />
      </Table>
    </BoardContainer>
  );
};

const PostList = ({ data, sportsName }: any) => {
  return (
    <>
      {data.map((post: any) => {
        return (
          <Link to={`/${sportsName.eng}/notice/detail/${post.id}`}>
            <PostTr key={post.id}>
              <Td>{post.id}</Td>
              <PostTitle>{post.title}</PostTitle>
              <Nickname>{post.nickname}</Nickname>
              <Td>{post.views}</Td>
            </PostTr>
          </Link>
        );
      })}
    </>
  );
};

const CommunityBox = ({ category }: { category: number }) => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const getBoardData = async (category?: any) => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/post/category/${category}`
        );
        const cutData = res.data.data.slice(0, 9);
        setBoardData(cutData);
      } catch (error) {
        console.error("게시판 불러오는거 실패함", error);
      }
    };
    getBoardData(category);
  }, []);

  const sportsName = getCategoryName(category);

  return (
    <>
      <CommunityContainer>
        <Link to={`/${sportsName.eng}/notice`}>
          <div className={styles.title}>
            오늘의 커뮤니티 {`> ${sportsName.kr}`}{" "}
          </div>
        </Link>
        <Body>
          <BoardBox data={boardData} sportsName={sportsName} />
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
  height: 550px;
  background: #ffffff;
  border: 2.5px solid #c5b5f1;
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
  align-content: flex-start;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: flex-start;s
  width: 1190px;
  height: 550px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
`;

const BoardContainer = styled.div`
  flex-wrap: wrap;
  flex-direction: row;
  width: 1100px;
  height: 220px;
`;

const Table = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  height: 500px;
  margin: auto;
  padding-top: 10px;
`;

const HeaderTr = styled.tr`
  display: none;
`;

const PostTr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1000px;
  height: 50px;
  border-bottom: 1px solid #cccccc;
`;

const PostTitle = styled.td`
  width: 700px;
`;

const Td = styled.td`
  width: 60px;
`;

const Nickname = styled.td`
  width: 130px;
`;
