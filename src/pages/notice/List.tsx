import React, { useEffect, useState } from "react";
import axios from "axios";

import { SectionTag } from "../../components/common/board/table/SectionTag";
import BreadCrumb from "../../components/common/board/BreadCrumb";
import { BoardBg } from "../../components/common/board/BoardBg";
import TableList from "../../components/common/TableList";

import Marquee from "react-fast-marquee";
import Button from "../../components/common/Button/Button";
import Popup from "../../components/common/Popup";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const List = () => {
  const notice = "공지사항 공지사항"; //나중에 데이터 받아옴!
  const categoryNum = window.location.href.split("/");
  const pageNumber = String(categoryNum[3]);
  const CATEGORY =
    "soccer" === pageNumber
      ? 0
      : "baseball" === pageNumber
      ? 1
      : "esport" === pageNumber
      ? 2
      : "";

  const [postData, setPostData] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigation = useNavigate();

  const popularList = popular.sort((x, y) => y.views - x.views).slice(0, 3);

  useEffect(() => {
    axios
      .get(`${apiUrl}post/category/${CATEGORY}`)
      .then((res) => {
        console.log("res::", res.data.data);
        return setPostData(res.data.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}post/category/${CATEGORY}`)
      .then((res) => {
        console.log("res::", res.data.data);
        return setPopular(res.data.data);
      })
      .catch((err) => {
        console.error("error", err);
      });
  }, []);

  const postRegister = () => {
    if (localStorage.getItem("accessToken") === "") {
      //일단 낼 수빈님께 말씀드려서 쿠키에 로그인 시 저장 하는 방법 사용 할 거임(로그인체크여부)
      setShowLoginPopup(true);
    }
    navigation(`/${pageNumber}/notice/edit`);
  };

  return (
    <div style={{ padding: "0 162px" }}>
      <SectionTag style={{ margin: "24px 0" }}>
        <BreadCrumb />
      </SectionTag>
      <SectionTag margin="0 0 49px">
        <h2 style={title}>공지사항</h2>
        <article style={noticeContent}>
          <Marquee
            style={{
              background: "#DFD6F9",
              height: "100%",
              margin: "0 0 0 20px",
            }}
            direction="left"
            speed={10}
            play={notice.length >= 115 ? true : false}
          >
            {notice}
          </Marquee>
        </article>
      </SectionTag>
      <h2 style={title}>게시판</h2>
      <BoardBg>
        <TableList
          show="all"
          data={postData}
          total={postData.length}
          limit={limit}
          page={page}
          setPage={setPage}
          popularData={popularList}
          category={pageNumber}
        />
      </BoardBg>
      <SectionTag margin="36px 0" display="flex">
        <div style={{ width: "120px" }}>
          <Button
            disabled={false}
            purpose="base"
            content="등록"
            onClick={postRegister}
          />
        </div>
      </SectionTag>
      <Popup
        title="로그인이 필요한 서비스입니다."
        count={2}
        disabled={false}
        content="로그인,취소하기"
        firstBtn="base"
        secondBtn="reportComment"
        clickHandler={() => navigation("/login")}
        cancelEvent={() => setShowLoginPopup(false)}
        open={showLoginPopup}
      />
    </div>
  );
};

export default List;

const title = {
  margin: "0 0 18px",
  fontSize: "32px",
  fontWeight: "700",
  color: "#323338",
};
const noticeContent = {
  display: "flex",
  alignItems: "center",
  height: "48px",
  fontSize: "16px",
  fontWeight: "500",

  color: "#323338",
  background: "#DFD6F9",
};
