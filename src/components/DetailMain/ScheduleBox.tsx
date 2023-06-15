import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import axios from "axios";

import styles from "../../styles/main.module.scss";
import DatePickerBox from "../common/DatePickerBox/DatePickerBox";
import { getCategoryName } from "../common/Dropdown";
import { Link } from "react-router-dom";
import { getCompareTime } from "../Main/ScheduleBox";

interface Team {
  _id: string;
  name: string;
  category: number;
  img: string;
}

interface Match {
  id: number;
  start_day: string;
  start_time: string;
  location: string;
  tema1_id: number;
  team1: string;
  tema1_img: string;
  tema2_id: number;
  team2: string;
  tema2_img: string;
  category: number;
  score1: number;
  score2: number;
  state: string;
  season: string;
}

// @ts-expect-error
const MatchContainer = ({ categoryData }) => {
  return (
    <>
      {categoryData.map((e: any) => {
        return (
          <MatchBox>
            <ImgBox>
              <LogoImg src={e.team1_img} />
              <div>{e.team1}</div>
            </ImgBox>
            <MatchData>
              <div>{e.season}</div>
              <Vs>vs</Vs>
              <State state={getCompareTime(e.start_date, e.start_time)}>
                {getCompareTime(e.start_date, e.start_time)}
              </State>
            </MatchData>
            <ImgBox>
              <LogoImg src={e.team2_img} />
              <div>{e.team2}</div>
            </ImgBox>
          </MatchBox>
        );
      })}
    </>
  );
};

const ScheduleBox = ({ category }: { category: number }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateData, setDateData] = useState([]);

  const sportsName = getCategoryName(category);

  useEffect(() => {
    const getSceduleData = async (date: any) => {
      const selectdate = format(date, "yyyy-MM-dd");
      try {
        const res = await axios.get(
          `http://localhost:5500/api/v1/schedule/day/${selectdate}`
        );
        const newData = res.data.data.filter(
          (data: { category: number }) => data.category === category
        );
        const cutData = newData.slice(0, 4);
        setDateData(cutData);
      } catch (error) {
        console.error("경기순위 불러오는거 실패함", error);
      }
    };
    getSceduleData(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <ScheduleContainer>
        <Header>
          <Link to={`/${sportsName.eng}/schedule`}>
            <div className={styles.title}>경기 일정 {`> ${sportsName.kr}`}</div>
          </Link>
        </Header>
        <Body>
          <DateContainer>
            <DatePickerBox
              purpose="main"
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </DateContainer>
          <MatchContainer categoryData={dateData} />
        </Body>
      </ScheduleContainer>
    </>
  );
};

export default ScheduleBox;

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 540px;
  background: #ffffff;
  border: 2.5px solid #c5b5f1;
  border-radius: 20px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: flex-start
  align-items: center;
  flex-direction: column;
  width: 160px;
  height: 40px;
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 390px;
  height: 430px;
`;

const MatchBox = styled.div`
  display: flex;
  width: 285px;
  height: 95px;
  border-top: 1px solid #d9d9d9;
  justify-content: space-between;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  margin: 5px;
  border-radius: 100%;
`;

const MatchData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 100px;
`;

const Vs = styled.div`
  height: 30px;
  padding: 5px;
  align-items: center;
  font-weight: 400;
  font-size: 24px;
`;

const State = styled.div<{ state: string }>`
  font-size: 14px;
  color: ${(props) => (props.state == "경기 종료" ? "red" : "#8F6EEB")};
`;

const ImgBox = styled.div`
  display: flex;
  width: 70px;
  height: 96px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
