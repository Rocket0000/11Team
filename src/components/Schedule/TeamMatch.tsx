import React from "react";
import styled from "styled-components";

interface TeamMatchProps {
  team1: string;
  team2: string;
  team1_img: string;
  team2_img: string;
  score1: number;
  score2: number;
  state: string;
}

const TeamMatch = (props: TeamMatchProps) => {
  const { team1, team2, team1_img, team2_img, score1, score2, state } = props;

  const getGameStatus = () => {
    if (state === "경기 전") {
      return "vs";
    }
    return state;
  };

  return (
    <Container>
      <Team className="left">
        <TeamName>{team1}</TeamName>
        <TeamImg src={team1_img} alt={team1} />
        <Score className={score1 > score2 ? "win" : ""}>{score1}</Score>
      </Team>
      <GameStatus>{getGameStatus()}</GameStatus>
      <Team className="right">
        <Score className={score1 < score2 ? "win" : ""}>{score2}</Score>
        <TeamImg src={team2_img} alt={team2} />
        <TeamName>{team2}</TeamName>
      </Team>
    </Container>
  );
};

export default TeamMatch;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Team = styled.div`
  width: 100px;
  display: flex;
  align-items: center;

  &.left {
    justify-content: end;
  }

  &.right {
    justify-content: start;
  }
`;

const GameStatus = styled.div`
  font-size: 12px;
  margin: 0 5px;
  color: #7c7b7b;
`;

const TeamName = styled.div`
  font-size: 14px;
`;

const TeamImg = styled.img`
  width: 26px;
  height: 26px;
  margin: 0 5px;
`;

const Score = styled.div`
  width: 10px;
  font-size: 16px;
  font-weight: bold;
  margin: 5px;

  &.win {
    color: #5f30e2;
  }
`;
