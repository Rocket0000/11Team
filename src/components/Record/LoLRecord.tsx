import React from 'react'
import styles from '../../styles/Record.module.scss'
import RecordPage from '../../pages/RecordPage';
import useRank from '../../hooks/useRank';

const LoLRecord = () => {
    const { reFetch, data } = useRank();

    // 선택한 시즌에 대한 데이터 불러오기
    const handleSeasonChange = (newSeason: string): void => {
        console.log(newSeason)
        reFetch(newSeason);
    }

    // 테이블 헤더 데이터
    const teamHeaders = ['순위', '팀'];
    const dataHeaders = ['승', '패', '득실차', '승률'];

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
            className={`${styles.tableHeader} ${index === 3 ? styles.tableHeaderPoints : ''}`}
        >
            {header}
        </th>
    ));

    const headers = [...teamHeaderElements, ...dataHeaderElements];

    // 롤 승률로 정렬
    const sortedData = [...data].sort((a, b) => {
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
            {sortedData.map((team, index) => {
                const { team_name, wins, losses, scored, conceded, img } = team;
                // 순위 계산
                const rank = index + 1;
                // 득실차 계산
                const scoreDifference = scored - conceded;
                // 총 게임수
                const totalGames = wins + losses;
                // 승률 계산
                const winRate = (wins / totalGames).toFixed(2);

                return (
                    <tr key={team_name}>
                        <td className={styles.rank}>{rank}</td>
                        <td className={styles.team}><img className={styles.teamImg} src={img} alt="팀 로고" /><span>{team_name}</span></td>
                        <td className={styles.selected}>{wins}</td>
                        <td>{losses}</td>
                        <td>{scoreDifference}</td>
                        <td>{winRate}</td>
                    </tr>
                );
            })}
        </>
    );

    const teamDatas = sortedData.map((team, index) => {
        const { team_name, img } = team;
        return (
            <tr key={index}>
                <td className={styles.rank}>{index + 1}</td>
                <td className={styles.team}><img className={styles.teamImg} src={img} alt="팀 로고" /><span>{team_name}</span></td>
            </tr>
        );
    });

    return (
        <div>
            <RecordPage headerTitle={headers} teamHeaderElements={teamHeaderElements} tbodyData={datas} teamDatas={teamDatas} selectedSeasonCallback={handleSeasonChange} />
        </div>
    )
}

export default LoLRecord;