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
    drawns: number;
    losses: number;
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
    };
});
const KboRecord = () => {
    const [teamseason, setTeamseason] = useState('');

    const headers = ['순위', '팀', '경기', '승', '무', '패', '승률', '게임차'];
    const headerElements = headers.map((header, index) => (
        <th key={index} style={{ textAlign: index === 1 ? 'left' : 'center', color: index === 6 ? '#5546B7' : 'inherit' }}>
            {header}
        </th>
    ));

    const cols = ["3%", "30%", "5%", "5%", "5%", "5%", "5%", "5%"];
    const colgroupElements = cols.map((colWidth, index) =>
        <col key={index} width={colWidth} />
    );

    // 야구 카테고리 : 1
    const baseballData = data.filter((item) => item.category === 1);

    // 야구는 승률로 정렬 (승률이 같으면 상대전적으로 정렬해야하지만 상대전적 데이터 x)
    const sortedData = [...baseballData].sort((a, b) => {
        const winRateA = a.wins / (a.wins + a.losses);
        const winRateB = b.wins / (b.wins + b.losses);
        return winRateB - winRateA;
    });
    const datas = (
        <>
            {sortedData.map((team: Team & Rank, index: number) => {
                const { name, wins, drawns, losses, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 총 게임 수
                const totalGames = wins + drawns + losses;
                // 승률 계산 (무승부 포함 x)
                const winRate = (wins / (wins + losses)).toFixed(3);
                // 게임차 계산
                const gameBehind = index === 0 ? '0.0' : (((sortedData[0].wins - sortedData[0].losses) - (wins - losses)) / 2).toFixed(1);

                return (
                    <tr key={name}>
                        <RankTd>{rank}</RankTd>
                        <TeamTd><img src={img} width={35} height={35} alt="" /><span>{name}</span></TeamTd>
                        <Td>{totalGames}</Td>
                        <Td>{wins}</Td>
                        <Td>{drawns}</Td>
                        <Td>{losses}</Td>
                        <WinRate>{winRate}</WinRate>
                        <Td>{gameBehind}</Td>
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

export default KboRecord;


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

const WinRate = styled(Td)`
    height: 44px;
    font-weight: bold;
    background-color: rgba(239, 234, 252, 0.4);
    content: "";
`;