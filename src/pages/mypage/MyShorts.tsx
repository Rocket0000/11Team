import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Image from "../../components/common/Image";
import Button from "../../components/common/Button/Button";
import InputComponent from "../../components/common/Input";

interface ShortsType {
  id: number;
  src: string;
  title: string;
}

const CATEGORY: { [key: string]: number } = {
  soccer: 0,
  축구: 0,
  baseball: 1,
  야구: 1,
  esport: 2,
  롤: 2,
};

const apiUrl = process.env.REACT_APP_API_URL;

const MyShorts = () => {
  const [shortsList, setShortsList] = useState<any>();
  const [shortsId, setShortsId] = useState<any>();
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [srcInput, setSrcInput] = useState("");
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조(ref)

  const getMyShorts = async () => {
    try {
      const token = localStorage.getItem(`accessToken`);
      const response = await axios.get(`${apiUrl}user/shorts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const datas = response.data.data;
      console.log(datas);
      setShortsList(datas);
    } catch (error) {
      console.error("Error submitting my shorts: ", error);
    }
  };

  const handleCheck = (id: number) => {
    if (selectedImageId === id) {
      // 이미 선택된 이미지를 클릭한 경우
      setSelectedImageId(null); // 선택 상태를 해제합니다.
    } else {
      // 새로운 이미지를 클릭한 경우
      setSelectedImageId(id); // 해당 이미지를 선택 상태로 설정합니다.
    }
  };

  const handleRemove = async () => {
    const token = localStorage.getItem(`accessToken`);
    const response = await axios.delete(`${apiUrl}shorts/${shortsId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleOpenModal = () => {
    setUpdateModal(true);
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setUpdateModal(false);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem(`accessToken`);
    const categoryNum = CATEGORY[categoryInput];
    const response = await axios.post(
      `${apiUrl}shorts`,
      {
        category: categoryNum,
        title: titleInput,
        src: srcInput,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
  };

  const handleCategory = (value: string) => {
    setCategoryInput(value);
  };

  const handleTitle = (value: string) => {
    setTitleInput(value);
  };

  const handleSrc = (value: string) => {
    setSrcInput(value);
  };

  useEffect(() => {
    getMyShorts();
  }, []);

  return (
    <>
      {shortsList ? (
        <MyShortsContainer>
          {shortsList.map((data: ShortsType, index: number) => {
            return (
              <ImageContainer
                key={index}
                onClick={() => handleCheck(data.id)}
                isSelected={selectedImageId === data.id}
              >
                <Image src={data.src} alt={data.title}></Image>
                <ImageTitle>{data.title}</ImageTitle>
              </ImageContainer>
            );
          })}
        </MyShortsContainer>
      ) : (
        <div>"동영상을 추가해주세요!"</div>
      )}
      {updateModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <UpdateModal>
            <InputContainer>
              <p>카테고리</p>
              <InputComponent
                value={categoryInput}
                onChange={handleCategory}
              ></InputComponent>
            </InputContainer>
            <InputContainer>
              <p>제목</p>
              <InputComponent
                value={titleInput}
                onChange={handleTitle}
              ></InputComponent>
            </InputContainer>
            <InputContainer>
              <p>파일</p>
              <InputComponent
                value={srcInput}
                onChange={handleSrc}
              ></InputComponent>
            </InputContainer>
            <ButtonCover>
              <Button
                disabled={false}
                purpose="base"
                content="등록"
                onClick={() => handleUpdate}
              ></Button>
            </ButtonCover>
          </UpdateModal>
        </ModalOverlay>
      )}
      <ButtonsContainer>
        <ButtonCover>
          <Button
            disabled={false}
            purpose="base"
            content="삭제"
            onClick={() => handleRemove}
          ></Button>
        </ButtonCover>

        <ButtonCover>
          <Button
            disabled={false}
            purpose="base"
            content="추가"
            onClick={handleOpenModal}
          ></Button>
        </ButtonCover>
      </ButtonsContainer>
    </>
  );
};

export default MyShorts;

const MyShortsContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 10px;
`;

const ImageContainer = styled.div<{ isSelected: boolean }>`
  width: 250px;
  height: 320px;
  background-color: black;
  border-radius: 20px;

  ${({ isSelected }) =>
    isSelected &&
    `
    border: 3px solid #5546B7;
    `}

  @media (max-width: 1400px) {
    width: 170px;
    height: 230px;
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: end;
`;

const ButtonCover = styled.div`
  width: 100px;
  margin: 0 5px 0 5px;
`;

const UpdateModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  height: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const InputContainer = styled.div``;

const ImageTitle = styled.p`
  display: block;
  margin: 10px;
`;
