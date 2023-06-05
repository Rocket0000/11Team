import React, { useState } from 'react'

import styled from "styled-components";
import RecordTable from './RecordTable';
import teamData from './teamData.json';
import rankData from './rankData.json';
import styles from './Record.module.scss'

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
    scored: number;
    conceded: number;
    points: number;
}

const data: (Team & Rank)[] = teamData.map((team: Team) => {
    const rank = rankData.find((rank: Rank) => rank._id === team._id);
    if (rank) {
        return {
            ...team,
            ...rank,
        };
    }
    return {
        ...team,
        season: '',
        wins: 0,
        drawns: 0,
        losses: 0,
        scored: 0,
        conceded: 0,
        points: 0,
    };
});

const KlRecord = () => {
    const [teamseason, setTeamseason] = useState('2023');

    const headers = ['순위', '팀', '경기', '승', '무', '패', '득점', '실점', '득실차', '승점'];
    const headerElements = headers.map((header, index) => (
        <th key={index} style={{ textAlign: index === 1 ? 'left' : 'center', color: index === 9 ? '#5546B7' : 'inherit' }}>
            {header}
        </th>
    ));

    const cols = ["3%", "30%", "5%", "5%", "5%", "5%", "5%", "5%", "5%", "5%"];
    const colgroupElements = cols.map((colWidth, index) =>
        <col key={index} width={colWidth} />
    );

    // 축구 카테고리 : 0
    const soccerData = data.filter((item) => item.category === 0);

    // 축구는 승점 높은순으로 정렬
    const sortedData = [...soccerData].sort((a, b) => {
        if (a.points !== b.points) {
            return b.points - a.points;
        } else {
            // 승점이 같은 경우 다득점 정렬
            return b.scored - a.scored;
        }
    });

    const datas = (
        <>
            {sortedData.map((team: Team & Rank, index: number) => {

                const { name, wins, drawns, losses, scored, conceded, points, img, season } = team;
                // 순위 계산
                const rank = index + 1;
                // 총 게임 수
                const totalGames = wins + drawns + losses;
                // 득실차 계산
                const goalDifference = scored - conceded;
                return (
                    <tr key={name}>
                        <RankTd>{rank}</RankTd>
                        <TeamTd><img src={img} width={35} height={35} alt="" /><span>{name}</span></TeamTd>
                        <Td>{totalGames}</Td>
                        <Td>{wins}</Td>
                        <Td>{drawns}</Td>
                        <Td>{losses}</Td>
                        <Td>{scored}</Td>
                        <Td>{conceded}</Td>
                        <Td>{goalDifference}</Td>
                        <Td className={styles.points}>{points}</Td>
                    </tr>
                );
            })}
        </>
    );
    return (
        <div>
            <RecordTable season={teamseason} colgroupData={colgroupElements} headerTitle={headerElements} tbodyData={datas} />
        </div>
    )
}

export default KlRecord;


const Td = styled.td`
    position: relative;
    vertical-align: middle;
    height: 45px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
`;

const RankTd = styled(Td)`
    font-weight: bold;
`;

const TeamTd = styled(Td)`
    display: flex;
    align-items: center;
    text-align: left;

    span{
        padding-left: 10px;
    }
`;

// const Points = styled(Td)`
//     height: 44px;
//     font-weight: bold;
//     background-color: rgba(239, 234, 252, 0.4);
//     content: "";
// `;