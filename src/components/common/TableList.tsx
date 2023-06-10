import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Post {
  id: number;
  popular: boolean;
  title: string;
  content: string;
  createdAt: Date;
  author: string;
  views: number;
}

interface TableProps {
  show: "all" | "my";
  data: Post[];
}

const TableWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
`;

const TableHeader = styled.thead`
  font-weight: bold;
  border-bottom: 1px solid #e3e3e3;
`;

const TableHeaderCell = styled.th<{ width?: string }>`
  width: ${({ width }) => width};
  padding: 15px 8px;
  color: #8f90a6;
  font-size: 14px;
`;

const TableRow = styled.tr.attrs<{ even?: boolean }>((props) => ({
  even: props.even ?? false,
}))<{ even?: boolean }>`
  background-color: ${({ even }) => (even ? "#fbfafe" : "inherit")};
`;

const TableCell = styled.td<{ width?: string }>`
  width: ${({ width }) => width};
  padding: 10px 5px;
  vertical-align: middle;

  & a {
    color: #333;
  }
`;

const TableList: React.FC<TableProps> = ({ show, data }) => {
  const renderTableHeader = () => {
    if (show === "all") {
      return (
        <TableHeader>
          <TableRow>
            <TableHeaderCell width="60px">번호</TableHeaderCell>
            <TableHeaderCell width="80px">인기글</TableHeaderCell>
            <TableHeaderCell>제목</TableHeaderCell>
            <TableHeaderCell width="100px">등록일</TableHeaderCell>
            <TableHeaderCell width="100px">작성자</TableHeaderCell>
            <TableHeaderCell width="60px">조회수</TableHeaderCell>
          </TableRow>
        </TableHeader>
      );
    } else if (show === "my") {
      return (
        <TableHeader>
          <TableRow>
            <TableHeaderCell width="60px">번호</TableHeaderCell>
            <TableHeaderCell>제목</TableHeaderCell>
            <TableHeaderCell width="100px">등록일</TableHeaderCell>
            <TableHeaderCell width="60px">조회수</TableHeaderCell>
          </TableRow>
        </TableHeader>
      );
    }
  };

  const renderTableRows = () => {
    return data.map((post, index) => (
      <TableRow key={post.id} even={index % 2 === 1}>
        <TableCell width="80px">{post.id}</TableCell>
        {show === "all" && (
          <TableCell width="80px">{post.popular ? "인기글!" : ""}</TableCell>
        )}
        <TableCell>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </TableCell>
        <TableCell width="100px">{post.createdAt.toISOString()}</TableCell>
        {show === "all" && <TableCell width="100px">{post.author}</TableCell>}
        <TableCell width="80px">{post.views}</TableCell>
      </TableRow>
    ));
  };

  return (
    <TableWrapper>
      {renderTableHeader()}
      <tbody>{renderTableRows()}</tbody>
    </TableWrapper>
  );
};

export default TableList;

/* 
설명

all : 전체 게시글 목록
my : 내가 작성한 글 목록

data props로 데이터 전달
<TableList show="all" data={}/>
<TableList show="my" data={}/>
*/