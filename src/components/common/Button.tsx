import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  disabled: boolean;
  purpose: "base" | "login";
  content: string;
}

const PURPOSE_STYLES = {
  base: css`
    --button-padding: 12px 16px;
  `,
  login: css`
    --button-width: 100%;
  `,
};

const Button: React.FC<ButtonProps> = ({ disabled, purpose, content }) => {
  const purposeStyle = PURPOSE_STYLES[purpose];

  return (
    <StyledButton disabled={disabled} purposeStyle={purposeStyle}>
      {content}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{ purposeStyle?: ReturnType<typeof css> }>`
  ${(p) => p.purposeStyle}

  margin: 0;
  border: none;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  padding: 12px 16px;
  border-radius: 8px;
  width: var(--button-width);
  background: #5f30e2;
  color: #ffffff;

  &:active,
  &:hover {
    background: #8f6eeb;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background: #dfd6f9;
  }
`;
