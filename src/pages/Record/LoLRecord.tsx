import React, { useState } from 'react'
import styled from "styled-components";
import RecordTable from './RecordTable';
import teamData from './teamData.json';
import rankData from './rankData.json';

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
    losses: number;
    scored: number;
    conceded: number;
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
        losses: 0,
        scored: 0,
        conceded: 0,
    };
});

const LoLRecord = () => {
    const [teamseason, setTeamseason] = useState('');

    const headers = ['순위', '팀', '승', '패', '득실차', '승률'];
    const headerElements = headers.map((header, index) => (
        <th key={index} style={{ textAlign: index === 1 ? 'left' : 'center', color: index === 6 ? '#5546B7' : 'inherit' }}>
            {header}
        </th>
    ));

    const cols = ["3%", "30%", "5%", "5%", "5%", "5%"];
    const colgroupElements = cols.map((colWidth, index) =>
        <col key={index} width={colWidth} />
    );

    // 롤 카테고리 : 2
    const esportsData = data.filter((item) => item.category === 2);

    // 롤 승률로 정렬
    const sortedData = [...esportsData].sort((a, b) => {
        const winRateA = a.wins / (a.wins + a.losses);
        const winRateB = b.wins / (b.wins + b.losses);
        if (winRateA !== winRateB) {
            return winRateB - winRateA;
        } else {
            // 승률이 같은 경우 득실차로 정렬
            const scoreDifferenceA = a.scored - a.conceded;
            const scoreDifferenceB = b.scored - b.conceded;
            return scoreDifferenceB - scoreDifferenceA;
        }
    });

    const datas = (
        <>
            {sortedData.map((team: Team & Rank, index: number) => {
                const { name, wins, losses, scored, conceded, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 득실차 계산
                const scoreDifference = scored - conceded;
                // 총 게임수
                const totalGames = wins + losses;
                // 승률 계산
                const winRate = (wins / totalGames).toFixed(2);

                return (
                    <tr key={name}>
                        <RankTd>{rank}</RankTd>
                        <TeamTd><img src={img} width={35} height={35} alt="" /><span>{name}</span></TeamTd>
                        <Wins>{wins}</Wins>
                        <Td>{losses}</Td>
                        <Td>{scoreDifference}</Td>
                        <Td>{winRate}</Td>
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

export default LoLRecord;


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

const Wins = styled(Td)`
    height: 44px;
    font-weight: bold;
    background-color: rgba(239, 234, 252, 0.4);
    content: "";
`;