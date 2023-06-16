import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Pagination, {
  PaginationProps,
} from "../../components/common/board/Pagination";
import PopularBadge from "./board/PopularBadge";

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  nickname: string;
  views: number;
}

interface TableProps extends PaginationProps {
  show: "all" | "my";
  data: Post[];
  popularData?: Post[];
  category?: string;
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

const TableList: React.FC<TableProps> = ({
  show,
  data,
  total,
  limit,
  page,
  setPage,
  popularData,
  category,
}) => {
  const offset = (page - 1) * limit;
  const myWriteLoction = window.location.href.split("/");

  const pageName = myWriteLoction[3] + "/" + myWriteLoction[4];

  const renderTableHeader = () => {
    if (show === "all") {
      return (
        <TableHeader>
          <TableRow>
            <TableHeaderCell width="60px">번호</TableHeaderCell>
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
    return data.slice(offset, offset + limit).map((post, index) => (
      <TableRow key={post.id} even={index % 2 === 1}>
        <TableCell width="80px">{post.id}</TableCell>
        <TableCell>
          <Link
            to={
              myWriteLoction[4] === "MyWrite"
                ? `/MyWrite/notice/detail/${post.id}`
                : `/${category}/notice/detail/${post.id}`
            }
          >
            {post.title}
          </Link>
        </TableCell>
        <TableCell width="100px">{post.created_at}</TableCell>
        {show === "all" && <TableCell width="100px">{post.nickname}</TableCell>}
        <TableCell width="80px">{post.views}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <TableWrapper>
        {renderTableHeader()}
        {show === "all" && (
          <tbody>
            {popularData?.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <PopularBadge></PopularBadge>
                      <div>
                        <Link to={`/${category}/notice/detail/${item.id}`}>
                          {item.title}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.nickname}</TableCell>
                  <TableCell>{item.views}</TableCell>
                </TableRow>
              );
            })}
          </tbody>
        )}
        <tbody>{renderTableRows()}</tbody>
        <tfoot>
          <tr>
            <td colSpan={6} style={{ border: 0 }}>
              <Pagination
                total={total}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </td>
          </tr>
        </tfoot>
      </TableWrapper>
    </>
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
