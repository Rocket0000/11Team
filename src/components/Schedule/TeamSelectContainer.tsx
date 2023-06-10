import React from "react";
import styled, { css } from "styled-components";

import { Team } from "../../pages/SchedulePage";

interface TeamSelectProps {
  team: Team;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const TeamSelectContainer = ({
  team,
  isSelected,
  onSelect,
}: TeamSelectProps) => {
  const { name, img, id } = team;

  return (
    <TeamContainer isSelected={isSelected} onClick={() => onSelect(id)}>
      <TeamImage src={img} alt={name} />
      <TeamName>{name}</TeamName>
    </TeamContainer>
  );
};

export default TeamSelectContainer;

const TeamContainer = styled.li<{ isSelected: boolean }>`
  width: 125px;
  height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  margin-right: 22px;
  cursor: ${(props) => (props.isSelected ? "default" : "pointer")};
  border: ${(props) =>
    props.isSelected ? "2px solid #5F30E2" : "1px solid #B5B5B5"};
  box-sizing: border-box;
  ${(props) =>
    props.isSelected &&
    css`
      ${TeamName} {
        color: #5f30e2;
        font-weight: bold;
      }
    `}
`;

const TeamImage = styled.img`
  width: 60px;
  height: 60px;
`;

const TeamName = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;
