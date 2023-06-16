import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Team {
    team_name: string,
    category: number,
    img: string,
    season: string;
    wins: number;
    drawns: number;
    losses: number;
    scored: number;
    conceded: number;
    points: number;
}

const useRank = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const location = useLocation();

    const path = location.pathname.split("/")[1];
    // 축구: 0, 야구: 1, 롤: 2
    const initCategory = path === 'soccer' ? '0' : path === 'baseball' ? '1' : path === 'esport' ? '2' : '';

    const [category, setCategory] = useState(initCategory);
    const [seasons, setSeasons] = useState<string[]>([]);
    const [defaultSeason, setDefaultSeason] = useState('');
    const [data, setData] = useState<Team[]>([]);

    // 시즌 첫번째 데이터를 기본으로 순위 데이터 가져오기
    useEffect(() => {
        const fetchSeasonData = async () => {
            try {
                const res = await axios.get(`${apiUrl}rank/${category}`);
                const seasons = res.data.data.map((item: { season: string }) => item.season);
                setSeasons(seasons)
                setDefaultSeason(res.data.data[0].season);

                const rankRes = await axios.get(`${apiUrl}rank/${category}/${res.data.data[0].season}`);
                setData(rankRes.data.data);

            } catch (err) {
                console.error(err);
            }
        };
        fetchSeasonData();
    }, [category]); // 카테고리 변경 시 실행


    // 모달창에서 시즌을 선택하면 그 시즌에 해당하는 순위데이터 다시 가져오기
    const reFetch = async (selectedSeason: string) => {
        try {
            const res = await axios.get(`${apiUrl}rank/${category}/${selectedSeason}`);
            setData(res.data.data);
        } catch (err) {
            console.error(err)
        }
    };
    return { defaultSeason, seasons, reFetch, data };
}

export default useRank
