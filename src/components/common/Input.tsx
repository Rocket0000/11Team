import React from "react";
import styled from "styled-components";

interface InputStyledProps {
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputStyledProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return <StyledInput type="text" value={value} onChange={handleChange} />;
};

export default Input;

const StyledInput = styled.input`
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #c7c9d9;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
    border: 3px solid #5f30e2;
  }
`;
