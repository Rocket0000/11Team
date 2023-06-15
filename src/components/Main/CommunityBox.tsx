import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import { getCategoryName } from "../common/Dropdown";
import { Link } from "react-router-dom";

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

const LinkTitle = ({ sportsName }: any) => {
  return (
    <Link to={`/${sportsName.eng}/notice`}>
      {sportsName.kr} {sportsName.kr == "전체" ? `글` : `게시판`}
    </Link>
  );
};

// @ts-expect-error
const BoardBox = ({ category }) => {
  const [boardData, setBoardData] = useState([]);

  const sportsName = getCategoryName(category);

  useEffect(() => {
    const getBoardData = async (category?: any) => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/post/main?category=${category}`
        );
        setBoardData(res.data.data);
      } catch (error) {
        console.error("게시판 불러오는거 실패함", error);
      }
    };
    getBoardData(category);
  }, []);

  return (
    <BoardContainer>
      <BoardTitle>
        {category == null ? (
          <div>
            {sportsName.kr} {sportsName.kr == "전체" ? `글` : `게시판`}
          </div>
        ) : (
          <LinkTitle sportsName={sportsName} />
        )}
      </BoardTitle>
      <Table>
        <TableHeader />
        <PostList data={boardData} category={category} />
      </Table>
    </BoardContainer>
  );
};

// @ts-expect-error
const PostList = ({ data, category }) => {
  const categoryName = getCategoryName(category);

  return (
    <>
      {data.map((post: any) => {
        const urlName =
          categoryName.eng == `all`
            ? getCategoryName(post.category).eng
            : categoryName.eng;
        return (
          <Link to={`/${urlName}/notice/detail/${post.id}`}>
            <PostTr key={post.게시글ID}>
              <Td>{post.id}</Td>
              <PostTitle>
                {post.title.length >= 30
                  ? post.title.substr(0, 25) + `....`
                  : post.title}
              </PostTitle>
              <Td>{post.views}</Td>
            </PostTr>
          </Link>
        );
      })}
    </>
  );
};

const CommunityBox = () => {
  return (
    <>
      <CommunityContainer>
        <div className={styles.title}>오늘의 커뮤니티</div>
        <Body>
          <PostListContainer>
            <BoardBox category={null} />
            <BoardBox category={0} />
            <BoardBox category={1} />
            <BoardBox category={2} />
          </PostListContainer>
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
  width: 550px;
  height: 220px;
`;

const BoardTitle = styled.div`
  font-size: 18px;
  width: 150px;
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
  height: 40px;
  border-bottom: 1px solid #cccccc;
`;

const PostTitle = styled.td`
  width: 350px;
`;

const Td = styled.td`
  width: 60px;
`;
