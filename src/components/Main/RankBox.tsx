import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import Dropdown, { getCategoryName } from "../common/Dropdown";
import { Link } from "react-router-dom";

interface Rank {
  team_id: number;
  season: string;
  wins: number;
  team_name: string;
  drawns: number;
  losses: number;
  winRate?: number;
}

const RankBox = () => {
  const HEADER_LIST = ["순위", "팀명", "경기", "승", "패", "무", "승률"];
  const [targetCatrgory, setTargetCatrgory] = useState(0);
  const [data, setData] = useState<Rank[]>([]);

  const dropdownSelect = (item: any) => {
    setTargetCatrgory(item);
  };

  const sportsName = getCategoryName(targetCatrgory);

  const getRankData = async (category: any) => {
    const season =
      category == 0
        ? `2023-K-League`
        : category === 1
        ? `2023-KBO`
        : `2023-LCK-Spring`;
    try {
      const res = await axios.get(
        `http://localhost:5500/api/v1/rank/${category}/${season}`
      );
      const targetData = res.data.data;
      const sortData = getTeamsWithWinRate(targetData);
      const cutData = sortData.slice(0, 5);
      setData(cutData);
    } catch (error) {
      console.error("랭크데이터 불러오는거 실패함", error);
    }
  };

  const calculateWinRate = (rank: Rank) => {
    const { wins, losses } = rank;
    const totalGames = wins + losses;
    const winRate = (wins / totalGames) * 100;

    return winRate.toFixed(2);
  };

  const getTeamsWithWinRate = (data: any) => {
    const teamsWithWinRate = data.map((rank: any) => {
      const winRate = calculateWinRate(rank);
      return { ...rank, winRate };
    });

    // @ts-expect-error
    const sortData = teamsWithWinRate.sort((a, b) => b.winRate - a.winRate);
    return sortData;
  };

  useEffect(() => {
    getRankData(targetCatrgory);
  }, []);

  //카테고리 변경시 data 변경
  useEffect(() => {
    getRankData(targetCatrgory);
  }, [targetCatrgory]);

  return (
    <>
      <RankContainer>
        <Header>
          <Link to={`/${sportsName.eng}/record`}>
            <div className={styles.title}>경기 순위 {`> ${sportsName.kr}`}</div>
          </Link>
          <Dropdown purpose="small" dropdownSelect={dropdownSelect} />
        </Header>
        <RankTable>
          <HeaderTr>
            {HEADER_LIST.map((item, index) => {
              return item == "팀명" || item == "승률" ? (
                <ThLa key={index}>{item}</ThLa>
              ) : (
                <ThSm key={index}>{item}</ThSm>
              );
            })}
          </HeaderTr>
          {data.map((item, index) => {
            return (
              <Tr
                key={item.team_id}
                className={index == 0 ? `${styles.numOne}` : ``}
              >
                <TdSm>{index + 1}</TdSm>
                <TdLa>{item.team_name}</TdLa>
                <TdSm>{item.wins + item.losses + item.drawns}</TdSm>
                <TdSm>{item.wins}</TdSm>
                <TdSm>{item.losses}</TdSm>
                <TdSm>{item.drawns}</TdSm>
                <TdLa>{item.winRate}%</TdLa>
              </Tr>
            );
          })}
        </RankTable>
      </RankContainer>
    </>
  );
};

export default RankBox;

const RankContainer = styled.div`
  display: flex;
  width: 400px;
  height: 298px;
  background: #ffffff;
  border: 2.5px solid #c5b5f1;
  border-radius: 20px;
  flex-direction: column;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RankTable = styled.table`
  display: flex;
  width: 360px;
  height: 550px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  margin-top: 12px;
`;
const ThLa = styled.th`
  font-size: 16px;
  font-weight: 400;
  width: 90px;
`;
const ThSm = styled.th`
  font-size: 16px;
  text-align: center;
  width: 32px;
`;
const HeaderTr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #a0a0a0;
  height: 30px;
`;
const Tr = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 359px;
  height: 33px;
  border-bottom: 1px solid #d9d9d9;
`;
const TdSm = styled.td`
  font-size: 16px;
  text-align: center;
  width: 32px;
`;
const TdLa = styled.td`
  font-size: 16px;
  text-align: center;
  width: 90px;
`;
