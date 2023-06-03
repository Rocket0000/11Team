import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 상위 컴포넌트에서 전달받는 props 값
interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  const [aspectRatio, setAspectRatio] = useState(1); // 이미지의 가로세로 비율을 저장하는 상태 변수
  const imageRef = useRef<HTMLImageElement>(null); // 이미지 요소에 대한 ref

  useEffect(() => {
    const imageElement = imageRef.current;

    if (imageElement) {
      imageElement.onload = () => {
        const { naturalWidth, naturalHeight } = imageElement;
        const newAspectRatio = naturalHeight / naturalWidth;
        setAspectRatio(newAspectRatio); // 이미지의 비율을 계산하여 상태 변수에 저장
      };
    }
  }, [src]);

  return (
    <ImageContainer aspectRatio={aspectRatio}>
      <StyledImage ref={imageRef} src={src} alt={alt} />
    </ImageContainer>
  );
};

export default Image;

// 이미지를 감싸는 컨테이너
const ImageContainer = styled.div<{
  aspectRatio: number;
}>`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: black;
  border: none;
  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

// 이미지 요소
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; // 이미지 비율을 유지한 채로 내부에 맞춤
`;
