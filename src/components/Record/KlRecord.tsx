import React from 'react'
import styles from '../../styles/Record.module.scss'
import styled from "styled-components";
import RecordPage from '../../pages/RecordPage';
import useRank from '../../hooks/useRank';

const KlRecord = () => {
    const { reFetch, data } = useRank();

    // 선택한 시즌에 대한 데이터 불러오기
    const handleSeasonChange = (newSeason: string): void => {
        console.log(newSeason)
        reFetch(newSeason);
    }

    // 테이블 헤더 데이터
    const teamHeaders = ['순위', '팀'];
    const dataHeaders = ['경기', '승', '무', '패', '득점', '실점', '득실차', '승점'];

    const teamHeaderElements = teamHeaders.map((header, index) => (
        <th
            key={index}
            className={`${styles.tableHeader} ${index === 1 ? styles.tableHeaderTeam : ''}`}
        >
            {header}
        </th>
    ));

    const dataHeaderElements = dataHeaders.map((header, index) => (
        <th
            key={index + teamHeaders.length}
            className={`${styles.tableHeader} ${index === 7 ? styles.tableHeaderPoints : ''}`}
        >
            {header}
        </th>
    ));

    const headers = [...teamHeaderElements, ...dataHeaderElements];


    // 축구는 승점 높은순으로 정렬
    const sortedData = [...data].sort((a, b) => {
        if (a.points !== b.points) {
            return b.points - a.points;
        } else {
            // 승점이 같은 경우 다득점 정렬
            return b.scored - a.scored;
        }
    });

    const datas = (
        <>
            {sortedData.map((team, index) => {
                const { team_name, wins, drawns, losses, scored, conceded, points, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 총 게임 수
                const totalGames = wins + drawns + losses;
                // 득실차 계산
                const goalDifference = scored - conceded;
                return (
                    <tr key={team_name}>
                        <Td className={styles.rank}>{rank}</Td>
                        <Td className={styles.team}><img className={styles.teamImg} src={img} alt="팀 로고" /><span>{team_name}</span></Td>
                        <Td>{totalGames}</Td>
                        <Td>{wins}</Td>
                        <Td>{drawns}</Td>
                        <Td>{losses}</Td>
                        <Td>{scored}</Td>
                        <Td>{conceded}</Td>
                        <Td>{goalDifference}</Td>
                        <Td className={styles.selected}>{points}</Td>
                    </tr>
                );
            })}
        </>
    );

    const teamDatas = sortedData.map((team, index) => {
        const { team_name, img } = team;
        return (
            <tr key={index}>
                <Td className={styles.rank}>{index + 1}</Td>
                <Td className={styles.team}><img className={styles.teamImg} src={img} alt="팀 로고" /><span>{team_name}</span></Td>
            </tr>
        );
    });

    return (
        <div>
            <RecordPage headerTitle={headers} teamHeaderElements={teamHeaderElements} tbodyData={datas} teamDatas={teamDatas} selectedSeasonCallback={handleSeasonChange} />
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
    padding: 0px 10px;
`