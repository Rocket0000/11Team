import React from "react";
import styled from "styled-components";

interface InputStyledProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputStyledProps> = ({
  type = "text",
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return <StyledInput type={type} value={value} onChange={handleChange} />;
};

export default Input;

const StyledInput = styled.input`
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #c7c9d9;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 3px solid #5f30e2;
  }
`;
