import React from "react";
import styled, { css } from "styled-components";

interface ArrowButtonProps {
  size?: "small" | "middle" | "large";
  rotate?: boolean;
}

const getSizeValue = (size?: "small" | "middle" | "large") => {
  switch (size) {
    case "small":
      return "15px";
    case "middle":
      return "20px";
    case "large":
      return "25px";
    default:
      return "20px";
  }
};

const ArrowButton: React.FC<ArrowButtonProps> = ({ size, rotate }) => {
  const width = getSizeValue(size);
  const height = getSizeValue(size);

  return (
    <SvgCover width={width} height={height} rotate={rotate}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 14 24"
      >
        <path
          fill="#555770"
          fillRule="evenodd"
          d="M13.44 10.66L12.09 12l1.35 1.34c.746-.74.746-1.94 0-2.68zM9.392 12L.559 20.765a1.885 1.885 0 000 2.68 1.92 1.92 0 002.7 0L13.441 13.34 12.09 12l1.35-1.34L3.259.555a1.92 1.92 0 00-2.7 0 1.885 1.885 0 000 2.68L9.391 12z"
          clipRule="evenodd"
        ></path>
      </svg>
    </SvgCover>
  );
};

export default ArrowButton;

const SvgCover = styled.div<{
  width: string;
  height: string;
  rotate?: boolean;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(180deg);
    `}
`;
