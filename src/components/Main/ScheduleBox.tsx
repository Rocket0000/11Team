import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import axios from "axios";

import styles from "../../styles/main.module.scss";
import DatePickerBox from "../common/DatePickerBox/DatePickerBox";
import matchData from "./Dummy/matchData.json";
import category from "./Dummy/category.json";

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

const today = format(new Date(), "yyyy-MM-dd");
const currentTime = format(new Date(), "hh:mm:ss");

// @ts-expect-error
const MatchContainer = ({ categoryData }) => {
  console.log("나 자식컴포넌트에서 전달받은 데이터야!", categoryData);

  // @ts-expect-error
  const compareTime = (time) => {
    if (currentTime < time) {
      return "종료";
    } else if (currentTime === time) {
      return "진행중";
    } else return `${time.slice(0, 5)} 예정`;
  };

  return (
    <>
      {categoryData.map((e: any) => {
        return (
          <MatchBox>
            <LogoImg src={e.tema1_img} />
            <MatchData>
              <div>
                {categoryData.category === 0
                  ? "츅구"
                  : categoryData.category === 1
                  ? "야구"
                  : "e-스포츠"}
              </div>
              <Vs>vs</Vs>
              <State state={e.state}>
                {today > e.start_day ? "종료" : compareTime(e.start_time)}
              </State>
            </MatchData>
            <LogoImg src={e.tema2_img} />
          </MatchBox>
        );
      })}
    </>
  );
};

const ScheduleBox = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectCategory, setSelectCategory] = useState<number>(0);
  const [dateData, setDateData] = useState(matchData.data);
  const [categoryData, setCategoryData] = useState(matchData.data);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let targetId = Number(e.target.value);
    console.log(targetId);
    return setSelectCategory(targetId);
  };

  //날짜당 데이터 받아옴
  // @ts-expect-error
  const getSceduleData = async (date) => {
    try {
      const res = await axios.get(
        `http://localhost:5500/api/v1/schedule/day/${date}`
      );
      setDateData(res.data);
    } catch (error) {
      console.error("경기순위 불러오는거 실패함", error);
    }
  };

  //선택한 날짜가 바뀔 때 마다 날짜 데이터 받아와서 dateData 업데이트
  useEffect(() => {
    getSceduleData(selectedDate);
    console.log(dateData);
  }, [selectedDate]);

  useEffect(() => {
    //선택한 카테고리가 바뀔 때 마다 categoryData 업데이트

    //matchData.category === 선택한 카테고리와 같은걸 필터해서 newData에 담음
    if (selectCategory < 3) {
      const newData = dateData.filter(
        (data) => data.category === selectCategory
      );
      console.log("newData", newData);
      setCategoryData(newData);
      console.log("categoryData", categoryData);
    } else {
      setCategoryData(dateData);
    }
  }, [selectCategory]);

  return (
    <>
      <ScheduleContainer>
        <Header>
          <div className={styles.title}>경기 일정</div>
          <select
            onChange={(e) => {
              handleChange(e);
            }}
          >
            {category.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </Header>
        <Body>
          <DateContainer>
            <DatePickerBox
              purpose="main"
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
          </DateContainer>
          <MatchContainer categoryData={categoryData} />
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
  border: 2.5px solid #d9d9d9;
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
const Header = styled.div`wi
  display: flex;
  justify-content: space-between;
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
  margin: 10px;
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
  color: ${(props) =>
    props.state == "종료"
      ? "red"
      : props.state == "예정"
      ? "#8F6EEB"
      : "#4EAF51"};
`;
