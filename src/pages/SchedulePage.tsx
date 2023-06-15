import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import DatePickerBox from "../components/common/DatePickerBox/DatePickerBox";
import TeamList from "../components/Schedule/TeamList";
import ScheduleTable from "../components/Schedule/ScheduleTable";
import ArrowButton from "../components/common/Button/ArrowButton";

export interface Team {
  id: number;
  name: string;
  category: number;
  img: string;
}

export interface Schedule {
  id: number;
  start_date: string;
  start_time: string;
  location: string;
  team1: string;
  team2: string;
  team1_img: string;
  team2_img: string;
  score1: number;
  score2: number;
  state: string;
}

const CATEGORY: { [key: string]: number } = {
  soccer: 0,
  baseball: 1,
  esport: 2,
};

const SchedulePage = () => {
  const { sports } = useParams() as { sports: string };

  const [teamList, setTeamList] = useState<Team[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number>(0); // id가 0이면 전체 팀
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const onSelect = (id: number) => {
    setSelectedTeamId(id);
  };

  const setPrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1)
    );
  };

  const setNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
    );
  };

  useEffect(() => {
    const getTeamList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/team/${CATEGORY[sports]}`
        );
        setTeamList(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTeamList();
  }, []);

  useEffect(() => {
    const dateString = format(selectedDate, "yyyyMM");

    // 날짜별 일정 가져오기
    const getScheduleData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/schedule/day/${dateString}`,
          {
            params: {
              category: CATEGORY[sports],
            },
          }
        );

        setScheduleData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    // 팀별 일정 가져오기
    const getScheduleDataByTeamId = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/schedule/${CATEGORY[sports]}/team`,
          {
            params: {
              teamId: selectedTeamId,
            },
          }
        );
        setScheduleData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedTeamId !== 0) {
      getScheduleDataByTeamId();
    } else {
      getScheduleData();
    }
  }, [selectedDate, selectedTeamId]);

  useEffect(() => {
    const scrollToSelectedDate = () => {
      // 이전에 선택된 날짜가 있으면 selected 클래스 제거
      const prevSelectedList = document.querySelectorAll(".selected");
      if (prevSelectedList) {
        prevSelectedList.forEach((prevSelected) => {
          prevSelected.classList.remove("selected");
        });
      }

      const selectedList = document.querySelectorAll(
        `[data-date="${format(selectedDate, "yyyyMMdd")}"]`
      );

      if (selectedList.length > 0) {
        // 선택된 날짜에 selected 클래스 추가
        selectedList.forEach((target) => {
          target.classList.add("selected");
        });

        selectedList[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    scrollToSelectedDate();
  }, [selectedDate]);

  return (
    <Container>
      <ScheduleContentContainer>
        <DateSelectContainer>
          <Button onClick={setPrevMonth}>
            <ArrowButton size="large" rotate={180} />
          </Button>
          <DatePickerBox
            purpose="schedule"
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
          <Button onClick={setNextMonth}>
            <ArrowButton size="large" rotate={0} />
          </Button>
        </DateSelectContainer>
        <ListContainer>
          <TeamList
            teamList={teamList}
            selectedTeam={selectedTeamId}
            onSelect={onSelect}
            category={CATEGORY[sports]}
          />
        </ListContainer>

        <ScheduleTable
          year={selectedDate.getFullYear()}
          month={selectedDate.getMonth() + 1}
          scheduleData={scheduleData}
        />
      </ScheduleContentContainer>
    </Container>
  );
};

export default SchedulePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ScheduleContentContainer = styled.div`
  margin: 0 auto;
  margin-top: 160px;
  width: calc(100vw - 324px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DateSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;
