import React from "react";
import styled, { css } from "styled-components";

export interface ButtonProps {
  disabled: boolean;
  purpose: "base" | "reportPost" | "reportComment";
  content: string;
  onClick?: () => void;
}

const PURPOSE_STYLES = {
  base: css``,

  reportPost: css`
    --button-bgcolor: #f54336;
    --button-bgcolor-hover: #f87b72;
  `,
  reportComment: css`
    --button-bgcolor: none;
    --button-bgcolor-hover: none;
    --button-color: black;
    --button-text-deco: underline;
  `,
};

const Button: React.FC<ButtonProps> = ({
  disabled,
  purpose,
  content,
  onClick,
}) => {
  const purposeStyle = PURPOSE_STYLES[purpose];

  return (
    <StyledButton
      disabled={disabled}
      purposeStyle={purposeStyle}
      onClick={onClick}
    >
      {content}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ purposeStyle?: ReturnType<typeof css> }>`
  ${(p) => p.purposeStyle}

  margin: 0;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: var(--button-bgcolor, #5f30e2);
  color: var(--button-color, #ffffff);
  text-decoration: var(--button-text-deco, none);

  &:active,
  &:hover {
    background: var(--button-bgcolor-hover, #8f6eeb);
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: #dfd6f9;
  }
`;
