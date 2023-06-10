import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { all } from "axios";

import styles from "../../styles/main.module.scss";
import rankData from "./Dummy/rankData.json";
import teamData from "./Dummy/teamData.json";
import category from "./Dummy/category.json";

interface Team {
  _id: string;
  name: string;
  category: number;
  img: string;
}

interface Rank {
  _id: string;
  season: string;
  wins: number;
  drawns: number;
  losses: number;
  winRate?: number;
  team_id: number;
}

const RankBox = () => {
  const HEADER_LIST = ["순위", "팀명", "경기", "승", "패", "무", "승률"];
  const [targetCatrgory, setTargetCatrgory] = useState(category[0]);
  const [data, setData] = useState<Rank[]>([]);

  //시즌별 팀 순위 받아옴
  const getRankData = async (category: any) => {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/v1/rank/1/2023 Season`
      );
      setData(res.data);
    } catch (error) {
      console.error("랭크데이터 불러오는거 실패함", error);
    }
  };

  //승률변환 함수
  const calculateWinRate = (rank: Rank) => {
    const { wins, losses } = rank;
    const totalGames = wins + losses;
    const winRate = (wins / totalGames) * 100;

    return winRate.toFixed(2);
  };

  //카테고리 인자로 받음, 해당하는 팀의 rankData를 찾아서 승률 삽입->정렬 후 반환
  //api 연결시 -> targetData에 승률 삽입->정렬 후 반환
  const getTeamsWithWinRate = (targetCatrgory: any) => {
    const targetTeam = teamData.filter(
      (team) => team.category === targetCatrgory._id
    );

    const teamIdsToFind = targetTeam.map((e) => Number(e._id));
    const targetRanks = rankData.filter((item) =>
      teamIdsToFind.includes(item.team_id)
    );

    // 팀별 승률 계산 및 정렬
    const teamsWithWinRate = targetRanks.map((rank) => {
      const winRate = calculateWinRate(rank);
      return { ...rank, winRate };
    });
    // @ts-expect-error
    teamsWithWinRate.sort((a, b) => b.winRate - a.winRate);
    //정렬한거 자르는 코드 구현필요
    return teamsWithWinRate;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let targetId = Number(e.target.value);
    return setTargetCatrgory(category[targetId]);
  };

  //페이지 로딩시 default category(=축구) 데이터 받아옴
  useEffect(() => {
    setTargetCatrgory(category[0]);
    const targetData = getTeamsWithWinRate(targetCatrgory);
    // @ts-expect-error
    setData(targetData);

    // getRankData(0);
  }, []);

  //카테고리 변경시 targetdata 변경
  useEffect(() => {
    const targetData = getTeamsWithWinRate(targetCatrgory);
    const newData = [...targetData];
    // @ts-expect-error
    setData(newData);

    //const targetData = getRankData(targetCatrgory)
    //const sortData = getTeamsWithWinRate(targetData)
    //setData(sortData);
  }, [targetCatrgory]);

  console.log("data", data);

  return (
    <>
      <RankContainer>
        <RankHeader>
          <div className={styles.title}>경기 순위</div>
          <select
            onChange={(e) => {
              handleChange(e);
            }}
          >
            {category.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </RankHeader>
        <RankTable>
          <HeaderTr>
            {HEADER_LIST.map((item, index) => {
              return <RankTh key={index}>{item}</RankTh>;
            })}
          </HeaderTr>
          {data.map((item, index) => {
            return (
              <Tr key={item._id}>
                <TdSm>{index + 1}</TdSm>
                <TdLa>
                  {item.team_id}
                  {/*item.name*/}
                </TdLa>
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
  border: 2.5px solid #d9d9d9;
  border-radius: 20px;
  flex-direction: column;
  margin-top: 20px;
`;
const RankHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RankTable = styled.table`
  displayl: flex;
  width: 360px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
`;
const RankTh = styled.th`
  font-size: 16px;
  font-weight: 400;
  width: 50px;
`;
const HeaderTr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #a0a0a0;
  border-bottom: 1px solid #a0a0a0;
  height: 31px;
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
  width: 44px;
`;
const TdLa = styled.td`
  font-size: 14px;
  text-align: center;
  width: 50px;
`;
