import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { BsFillChatLeftDotsFill } from "react-icons/bs";

import Image from "../../components/common/Image";
import ArrowButton from "../../components/common/Button/ArrowButton";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button/Button";
import Comment from "../../components/common/Comment";

interface CommentType {
  comment_id: number;
  user_id: number;
  img: string;
  nickname: string;
  content: string;
  created_at: string;
}

interface ShortsType {
  id: number;
  title: string;
  views: number;
  src: string;
  category: number;
}

interface ShortsPropsType {
  id?: number | null | undefined;
  category?: number | null;
}

// 서버에 데이터를 받아올 때 이미 존재하는 id이면 다시 받아오도록
const Shorts: React.FC<ShortsPropsType> = ({ id, category }) => {
  const localSaveUserId = localStorage.getItem("userId");
  const parsedUserId = localSaveUserId ? parseInt(localSaveUserId) : 0;

  const [curShorts, setCurShorts] = useState<ShortsType>();
  const [loading, setLoading] = useState(true);
  const [shortsList, setShortsList] = useState<number[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const getFirstShorts = async (
    id?: number | undefined | null,
    category?: number | undefined | null
  ) => {
    try {
      let url = `http://localhost:5500/api/v1/shorts/${
        id !== undefined ? "detail" : "category/detail"
      }`;

      console.log(url);
      console.log("category", category);
      const response = await axios.get(url, {
        params: {
          shorts_id: id !== undefined ? id : null,
          category: category !== undefined ? category : null,
        },
      });
      const shorts = response.data.detail;
      const shortsList = response.data.lists;
      console.log(shortsList);

      setCurShorts(shorts);
      setShortsList(shortsList);
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  // 쇼츠를 불러오는 함수
  const getShorts = async (shorts_id?: number) => {
    try {
      console.log("shorts_id", shorts_id);
      const response = await axios.get(
        `http://localhost:5500/api/v1/shorts/detail/${shorts_id}`
      );
      const shorts = response.data.detail;
      console.log(shorts);

      setCurShorts(shorts);
    } catch (error) {
      console.error("Error fetching shorts:", error);
    }
  };

  // shortsId에 해당하는 댓글을 가져오는 함수
  const getComments = async (shortsId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/api/v1/comment/list/${shortsId}`,
        {
          params: {
            contents_category: 0,
          },
        }
      );
      const comments = response.data.data;
      setComments(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // 이전 쇼츠를 가져오는 함수
  const preShorts = () => {
    let newIndex = 0;
    if (index <= 0) {
      newIndex = shortsList.length - 1;
    } else {
      newIndex = index - 1;
    }
    setIndex(newIndex);

    const shortsId = shortsList[newIndex];

    getShorts(shortsId);
  };

  // 다음 쇼츠를 가져오는 함수
  const nextShorts = () => {
    let newIndex = 0;
    if (index >= shortsList.length - 1) {
      newIndex = 0;
    } else {
      newIndex = index + 1;
    }
    setIndex(newIndex);

    const shortsId = shortsList[newIndex];
    getShorts(shortsId);
  };

  // input 핸들러
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  // 버튼을 클릭하면 input 값을 가지고 댓글 등록하는 로직 작성
  const handleComment = async () => {
    try {
      if (!curShorts) {
        // curShorts가 null인 경우 에러 처리
        throw new Error("No current shorts available");
      }

      const token = localStorage.getItem("accessToken");

      const requestBody = {
        contents_category: 0,
        id: curShorts.id,
        content: input,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `http://localhost:5500/api/v1/comment/`,
        requestBody,
        config
      );

      setInput("");

      getComments(curShorts.id);
    } catch (error) {
      console.error("Error submitting comment: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchShorts = async () => {
      await getFirstShorts(id, category);

      setLoading(false);
    };

    fetchShorts();
  }, []);

  useEffect(() => {
    setLoading(true);

    if (curShorts) {
      getComments(curShorts.id);
    }

    setLoading(false);
  }, [curShorts]);

  return (
    <ShortsContainer>
      <ArrowButton rotate={180} onClick={preShorts}></ArrowButton>
      <StyledShort>
        {loading ? ( // Render "Loading..." when loading state is true
          <p>Loading...</p>
        ) : (
          curShorts && (
            <ImageCover>
              <Image src={curShorts.src} alt={"쇼츠입니다."}></Image>
              <ImageContent>
                <Title>{curShorts.title}</Title>
                <Views>{curShorts.views} views</Views>
              </ImageContent>

              <ShortsButton onClick={() => setModalOpen(true)}>
                <CommentsButton />
              </ShortsButton>
            </ImageCover>
          )
        )}
      </StyledShort>

      {modalOpen && ( // 모달 창이 열려있을 때에만 Modal 컴포넌트를 렌더링합니다.
        <Modal>
          <CommentCover onClick={() => setModalOpen(false)}>
            <Comment data={comments} localSaveUserId={parsedUserId}></Comment>
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
        </Modal>
      )}

      <StyledComment>
        <CommentsHeader>
          <CommentsTitle>댓글</CommentsTitle>
          <CommentsCount>{comments.length}</CommentsCount>
        </CommentsHeader>
        <CommentCover>
          <Comment data={comments} localSaveUserId={parsedUserId}></Comment>
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
      <ArrowButton rotate={0} onClick={nextShorts}></ArrowButton>
    </ShortsContainer>
  );
};

export default Shorts;

const ShortsContainer = styled.main`
  display: flex;
  margin: 30px 162px 30px 162px;
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
  position: relative;
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
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
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

const ShortsButton = styled.button`
  position: absolute;
  bottom: 50px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  background-color: #efeafc;
  border: 1px solid black;
  border-radius: 50%;

  @media (min-width: 1400px) {
    display: none;
  }
`;

const Modal = styled.div`
  width: 360px;
  height: 640px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;
  overflow: auto;
  background: rgba(0, 0, 0, 0.6);
`;

const CommentsButton = styled(BsFillChatLeftDotsFill)``;

const ImageContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
`;

const Title = styled.p`
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 20px;
`;

const Views = styled.p`
  color: white;
  font-weight: bold;
`;
