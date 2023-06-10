import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Image from "../../components/common/Image";
import ArrowButton from "../../components/common/Button/ArrowButton";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button/Button";
import Comment from "../../components/common/Comment";

interface CurShorts {
  id: number;
  title: string;
  views: number;
  src: string;
  // 카테고리가 어떤 값으로 오는지 한번 더 체크
  category: number;
}

// Comment 컴포넌트의 타입과 완전히 같은데 불러오는 방법 찾아보기???
interface CommentType {
  alt: string;
  img: string;
  nickname: string;
  info: string;
  date: string;
  userId: number;
  localSaveUserId: number;
  clickHandler: () => void;
}

interface ShortsListType {
  id: number;
  title: string;
  src: string;
  user_img: string;
  nickname: string;
  views: number;
}

const Shorts: React.FC = () => {
  // 이전 페이지에서 category 값을 전달받아서 어디 카테고리에서 온 지 확인해 데이터를 불러온다.
  const location = useLocation();
  const previousCategory = location.state?.category;

  const [curShorts, setCurShorts] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [shortsList, setShortsList] = useState([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentsCount, setCommentsCount] = useState();
  const [input, setInput] = useState("");

  // 최신순 불러오는 함수
  const getShortsList = async (category?: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/shorts?category=${
          category ? encodeURIComponent(category) : ""
        }`
      );
      const shorts = response.data;
      setShortsList(shorts);
      return shorts;
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  // 쇼츠 하나만 불러오는 함수
  const getShorts = async (shortsId: number) => {
    try {
      const response = await axios.get(`http://localhost:5500/api/v1/shorts`, {
        params: {
          shortsId,
        },
      });
      const shorts = response.data;
      setCurShorts(shorts);
    } catch (error) {}
  };

  // shorts에 해당하는 댓글을 가져오는 함수
  const getComments = async (shortsId: number) => {
    try {
      // ?shorts의 id는 어떻게 받을 것인가? query? 아니면 path?
      const response = await axios.get(
        `http://localhost:5500/api/v1/comment/list`,
        {
          params: {
            shortsId,
          },
        }
      );
      const comments = response.data;
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // 이전 쇼츠를 가져오는 함수
  const preImage = () => {};

  // 다음 쇼츠를 가져오는 함수
  const nextImage = () => {};

  // input 핸들러
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  // 신고냐 삭제냐 로직
  const handle = () => {};

  // 버튼을 클릭하면 input 값을 가지고 댓글 등록하는 로직 작성
  const handleComment = async () => {
    try {
      if (!curShorts) {
        // curShorts가 null인 경우 에러 처리
        throw new Error("No current shorts available");
      }

      const response = await axios.post(
        `http://localhost:5500/api/v1/comment`,
        {
          content_category: curShorts.category,
          id: curShorts.id,
          content: input,
        }
      );
      const responseData = response.data;
    } catch (error) {
      console.error("Error submitting comment: ", error);
    }
  };

  useEffect(() => {
    // curImage가 존재하면 현재 이미지의 id를 넘긴다.
    setLoading(true);

    if (curShorts) {
      getComments(curShorts.id);
    } else {
      if (previousCategory) {
        getShortsList(previousCategory)
          .then((shorts) => {
            console.log(shorts);
            if (shorts.length > 0) {
              const firstShortsId = shorts[0].id;
              getShorts(firstShortsId);
            }
          })
          .catch((error) => {
            console.error("Error fetching shorts:", error);
          });
      } else {
        getShortsList()
          .then((shorts) => {
            if (shorts.length > 0) {
              const firstShortsId = shorts[0].id;
              getShorts(firstShortsId);
            }
          })
          .catch((error) => {
            console.error("Error fetching shorts:", error);
          });
      }
    }

    setLoading(false);
  }, [curShorts, previousCategory]);

  return (
    <ShortsContainer>
      <ArrowButton rotate={180}></ArrowButton>
      <StyledShort>
        {loading ? ( // Render "Loading..." when loading state is true
          <p>Loading...</p>
        ) : (
          curShorts && (
            <ImageCover>
              <Image src={curShorts.src} alt={"쇼츠입니다."}></Image>
            </ImageCover>
          )
        )}
      </StyledShort>

      <StyledComment>
        <CommentsHeader>
          <CommentsTitle>댓글</CommentsTitle>
          <CommentsCount>3{commentsCount}</CommentsCount>
        </CommentsHeader>
        <CommentCover>
          <Comment
            alt="user"
            img="https://cdn.pixabay.com/photo/2023/05/28/13/15/helicopter-8023696_640.jpg"
            nickname="user"
            info="댓글에는 이런 내용이 들어갈 예정입니다 확ㅇ"
            date="2023-06-09"
            localSaveUserId={0}
            userId={0}
            clickHandler={handle}
          ></Comment>

          {/* 닫는 버튼(이건 크기에 따라 달라졌을 때 추가되는 걸로) */}
          {/* {comments.map((comment) => (
            <Comment
              alt={comment.user.nickname}
              img={comment.user.img}
              nickname={comment.user.nickname}
              info={comment.content}
              date={comment.date}
              localSaveUserId={현재 유저의 id}
              userId={comment.user.id}
              clickHandler={"삭제하기"나 "신고하기" 이벤트}
            />
          ))} */}
          {/* 댓글들
          // 댓글 => 전달받은 댓글 갯수만큼 댓글 컴포넌트에 담아 작성
        */}
        </CommentCover>
        <InputCover>
          <InputContainer>
            <Input value={input} onChange={handleInputChange} />
          </InputContainer>
          <ButtonContainer>
            <Button
              disabled={false}
              purpose="base"
              content="댓글"
              onClick={handleComment}
            ></Button>
          </ButtonContainer>
        </InputCover>
      </StyledComment>
      <ArrowButton rotate={0}></ArrowButton>
    </ShortsContainer>
  );
};

export default Shorts;

const ShortsContainer = styled.main`
  display: flex;
  margin: 0 162px 30px 162px;
  align-items: center;
  justify-content: center;
`;

const StyledShort = styled.div``;

const StyledComment = styled.div`
  width: 450px;
  height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #efeafc;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  transition: opacity 0.3s, width 0.3s, height 0.3s;

  @media (max-width: 1400px) {
    opacity: 0;
    width: 0;
  }

  @media (min-width: 1400px) {
    opacity: 1;
    width: 450px;
  }

  @media (min-width: 2000px) {
    width: 754px;
    height: 1340px;
  }
`;

const ImageCover = styled.div`
  width: 360px;
  height: 640px;
  background-color: black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: width 0.3s, height 0.3s;

  @media (max-width: 1400px) {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  @media (min-width: 2000px) {
    width: 754px;
    height: 1340px;
  }
`;

const CommentCover = styled.div`
  flex-grow: 20;
  width: 90%;
  overflow: auto;
`;

const CommentsHeader = styled.div`
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: end;
  flex-grow: 1;
  margin-bottom: 10px;
`;

const CommentsTitle = styled.p`
  font-size: 20px;
  margin-right: 10px;
`;

const CommentsCount = styled.p`
  font-size: 16px;
`;

const InputCover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 50px;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 50px;
`;

const LoadingMessage = styled.p`
  width: 100px;
  height: 100px;
`;
