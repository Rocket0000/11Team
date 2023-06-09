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

    const headers = ['순위', '팀', '승', '패', '득실차', '승률'];
    const headerElements = headers.map((header, index) => (
        <th
            key={index}
            className={`${styles.tableHeader} ${index === 1 ? styles.tableHeaderTeam : ''} ${index === 2 ? styles.tableHeaderPoints : ''}`}
        >
            {header}
        </th>
    ));

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
    return (
        <div>
            <RecordPage headerTitle={headerElements} tbodyData={datas} selectedSeasonCallback={handleSeasonChange} />
        </div>
    )
}

export default LoLRecord;