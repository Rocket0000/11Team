import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import { getCategoryName } from "../common/Dropdown";
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

const RankBox = ({ category }: { category: number }) => {
  const HEADER_LIST = ["순위", "팀명", "경기", "승", "패", "무", "승률"];
  const [data, setData] = useState<Rank[]>([]);

  const sportsName = getCategoryName(category);

  //승률변환 함수
  const calculateWinRate = (rank: Rank) => {
    const { wins, losses } = rank;
    const totalGames = wins + losses;
    const winRate = (wins / totalGames) * 100;

    return winRate.toFixed(2);
  };

  //rankData 받아서 승률 삽입->정렬 후 반환
  const getTeamsWithWinRate = (data: any) => {
    const teamsWithWinRate = data.map((rank: any) => {
      const winRate = calculateWinRate(rank);
      return { ...rank, winRate };
    });

    // @ts-expect-error
    const sortData = teamsWithWinRate.sort((a, b) => b.winRate - a.winRate);
    return sortData;
  };

  // 페이지 로딩시 default category(=축구) 데이터 받아옴
  useEffect(() => {
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
        setData(sortData);
      } catch (error) {
        console.error("랭크데이터 불러오는거 실패함", error);
      }
    };
    getRankData(category);
  }, []);

  return (
    <>
      <RankContainer>
        <Header>
          <Link to={`/${sportsName.eng}/record`}>
            <div className={styles.title}>{`경기 순위 > ${sportsName.kr}`}</div>
          </Link>
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
  height: 550px;
  background: #ffffff;
  border: 2.5px solid #d9d9d9;
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
`;
const ThLa = styled.th`
  font-size: 14px;
  font-weight: 400;
  width: 90px;
`;
const ThSm = styled.th`
  font-size: 14px;
  text-align: center;
  width: 30px;
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
  font-size: 14px;
  text-align: center;
  width: 30px;
`;
const TdLa = styled.td`
  font-size: 14px;
  text-align: center;
  width: 90px;
`;
