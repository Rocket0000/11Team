import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

import KakaoMap from "../components/Stadium/KakaoMap";
import { Schedule } from "./SchedulePage";

const CATEGORY = ["전체", "축구", "야구", "LOL"];

const apiUrl = process.env.REACT_APP_API_URL;

const StadiumPage = () => {
  const location = useLocation();
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [schedule, setSchedule] = useState<Schedule | null>(
    location.state?.schedule || null
  );
  const [category, setCategory] = useState<number>(0);
  const [filteredScheduleData, setFilteredScheduleData] = useState<Schedule[]>(
    []
  );

  useEffect(() => {
    // 일정 페이지에서 넘어온 경우 해당 경기장만 보여줌
    if (schedule) {
      setFilteredScheduleData([schedule]);
      return;
    }

    // 일정 페이지에서 넘어오지 않은 경우 오늘 진행되는 경기의 경기장 보여줌
    const getScheduleData = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}schedule/day/${format(new Date(), "yyyy-MM-dd")}`
        );
        setScheduleData(res.data.data);
        setFilteredScheduleData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getScheduleData();
  }, [schedule]);

  useEffect(() => {
    // 일정 페이지에서 넘어온 경우 필터링 없이 해당 경기장만 보여줌
    if (!schedule) {
      // 카테고리 선택에 따라 경기장 필터링
      if (category === 0) {
        setFilteredScheduleData(scheduleData);
        return;
      }

      const filteredData = scheduleData.filter(
        (schedule) => schedule.category === category - 1
      );
      setFilteredScheduleData(filteredData);
    }
  }, [category]);

  return (
    <Container>
      {!schedule && (
        <FilterContainer>
          {CATEGORY.map((item, idx) => (
            <FilterItem
              key={item}
              onClick={() => {
                setCategory(idx);
              }}
              isSelected={category === idx}
            >
              {item}
            </FilterItem>
          ))}
        </FilterContainer>
      )}

      <KakaoMap scheduleList={filteredScheduleData} />
    </Container>
  );
};

export default StadiumPage;

const Container = styled.div`
  width: 80%;
  height: 50vh;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

const FilterItem = styled.div<{ isSelected: boolean }>`
  margin-right: 20px;
  cursor: pointer;
  ${(props) => props.isSelected && "font-weight: bold;"}
`;
