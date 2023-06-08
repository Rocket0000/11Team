import React from "react";
import styled from "styled-components";
import Button from "./Button/Button";
import Avatar from "@mui/material/Avatar";

interface CommentProps {
  alt: string,
  img : string,
  nickname : string;
  info : string;
  date : string;
  userId : number;
  localSaveUserId: number;
  clickHandler: () => void;
}

const Comment:React.FC<CommentProps> = ({ alt, img, nickname, info, date, localSaveUserId, userId, clickHandler }) => {

  return(
    <StyledComment>
      <div className="commentCon">
        <Avatar
          alt={alt}
          src={img}
          sx={{ width: 34, height: 34 }}
        />
        <section className="commentArea">
          <h3>{ nickname }</h3>
          <p>{ info }</p>
        </section>
        <p className="commentDate">{ date }</p>
        <Button 
          content={
            userId === localSaveUserId ? "삭제하기" : "신고하기"
          }
          purpose="reportComment"
          disabled={false}
          onClick={clickHandler}
        />
      </div>
    </StyledComment>
  );
}

export default Comment;


const StyledComment = styled.section`
  background: #FBFAFE;
  width: 100%;
  height: auto;

  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #323338;
  
  div.commentCon{
    display: flex;
    align-items: center;
    padding: 0 30px;
  }
  div.commentCon section.commentArea{
    padding: 20px  0 20px 22px;
    width: 100%;
    height: 100%;
    background: transparent;
  }
  div.commentCon section.commentArea p{
    margin: 5px 0px 0px;
    word-break: keep-all;
  }
  div.commentCon p.commentDate{
    margin: 0 22px 0;
    white-space: nowrap;
    text-align: center;
  }
  Button{
    width: auto;
    background: initial;
    border: 0;
    font-size: 14px;
    white-space: nowrap;
    text-align: center;
  }
`