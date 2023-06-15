import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Button from "./Button/Button";
import Popup from "../../components/common/Popup";
import { useNavigate } from "react-router-dom";

interface Comment {
  comment_id: number;
  user_id: number;
  img: string;
  nickname: string;
  content: string;
  created_at: string;
}

interface CommentProps {
  data: Comment[];
  localSaveUserId: number;
}

const Comment: React.FC<CommentProps> = ({ data, localSaveUserId }) => {
  const token = localStorage.getItem("accessToken");

  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showLoginCheckPopup, setShowLoginCheckPopup] = useState(false);

  const popupBtn = { disable: false };

  const navigation = useNavigate();

  const wrapComment = () => {
    return (
      <>
        {data.map((item) => {
          const deleteComment = (commentId: number) => {
            if (item.user_id === localSaveUserId) {
              console.log("삭제", commentId);
              return axios
                .delete(`http://localhost:5500/api/v1/comment/${commentId}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((res) => {
                  console.log("status", res.status);
                  if (res.status === 200) {
                    console.log("삭제에 성공하였습니다.");
                  }
                  window.location.replace(window.location.href);
                })
                .catch((err) => {
                  console.log("err", err);
                });
            }
            if (token === "") {
              return setShowLoginCheckPopup(true);
            }
            setShowReportPopup(true);
          };

          const reportComment = (comment_Id: number) => {
            axios
              .put(
                `http://localhost:5500/api/v1/comment/report/${comment_Id}`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                console.log("status", res.status);
                if (res.status === 200) {
                  console.log("신고에 성공하였습니다.");
                }
                setShowReportPopup(false);
              })
              .catch((err) => {
                console.log("err", err);
              });
          };

          const reportLogin = () => {
            navigation("/login");
          };

          return (
            <>
              <StyledComment key={item.comment_id}>
                <div className="commentCon">
                  <Avatar
                    alt={item.nickname}
                    src={item.img}
                    sx={{ width: 34, height: 34 }}
                  />
                  <section className="commentArea">
                    <h3>{item.nickname}</h3>
                    <p>{item.content}</p>
                  </section>
                  <p className="commentDate">{item.created_at}</p>
                  <Button
                    content={
                      item.user_id === localSaveUserId ? "삭제하기" : "신고하기"
                    }
                    purpose="reportComment"
                    disabled={false}
                    onClick={() => deleteComment(item.comment_id)}
                  />
                </div>
              </StyledComment>
              <Popup
                title="정말신고하시겠습니까?"
                count={2}
                disabled={false}
                content="신고하기,취소하기"
                firstBtn="base"
                secondBtn="reportComment"
                clickHandler={() => reportComment(item.comment_id)}
                cancelEvent={() => setShowReportPopup(false)}
                open={showReportPopup}
              />
              <Popup
                title="로그인이 필요한 서비스입니다."
                count={2}
                disabled={false}
                content="로그인,취소하기"
                firstBtn="base"
                secondBtn="reportComment"
                clickHandler={reportLogin}
                cancelEvent={() => setShowLoginCheckPopup(false)}
                open={showLoginCheckPopup}
              />
            </>
          );
        })}
      </>
    );
  };

  return wrapComment();
};

export default Comment;

const StyledComment = styled.section`
  background: #fbfafe;
  width: 100%;
  height: auto;

  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  color: #323338;

  div.commentCon {
    display: flex;
    align-items: center;
    padding: 0 30px;
  }
  div.commentCon section.commentArea {
    padding: 20px 0 20px 22px;
    width: 100%;
    height: 100%;
    background: transparent;
  }
  div.commentCon section.commentArea p {
    margin: 5px 0px 0px;
    word-break: keep-all;
  }
  div.commentCon p.commentDate {
    margin: 0 22px 0;
    white-space: nowrap;
    text-align: center;
  }
  Button {
    width: auto;
    background: initial;
    border: 0;
    font-size: 14px;
    white-space: nowrap;
    text-align: center;
  }
`;
