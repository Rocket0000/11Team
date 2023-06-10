import React from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";

import {
  getDaysInMonthArr,
  isSameDate,
  formatDateForTable,
} from "../../utils/date";
import TeamMatch from "./TeamMatch";
import { Schedule } from "../../pages/SchedulePage";

interface ScheduleTableProps {
  year: number;
  month: number;
  scheduleData: Schedule[];
}

const ScheduleTable = ({ year, month, scheduleData }: ScheduleTableProps) => {
  const today = new Date();

  const tableRowClassNames = (idx: number, isToday: boolean) => {
    const classNames = [];
    if (idx % 2) classNames.push("bg");
    if (isToday) classNames.push("today");
    return classNames.join(" ");
  };

  return (
    <Table>
      <colgroup>
        <DateColumn />
        <TimeColumn />
        <LocationColumn />
        <GameColumn />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableHeader>날짜</TableHeader>
          <TableHeader>시간</TableHeader>
          <TableHeader>장소</TableHeader>
          <TableHeader>경기</TableHeader>
        </TableRow>
      </TableHead>
      <tbody>
        {getDaysInMonthArr(year, month).map((date, rowIdx) => {
          const scheduleList = scheduleData.filter((schedule) =>
            isSameDate(
              new Date(schedule.start_date),
              new Date(year, month - 1, date)
            )
          );
          const isToday = isSameDate(new Date(year, month - 1, date), today);
          if (scheduleList.length > 0) {
            return scheduleList.map((schedule, idx) => (
              <TableRow
                key={schedule.id}
                className={`${tableRowClassNames(rowIdx, isToday)} ${
                  idx === 0 ? "first" : ""
                } ${idx === scheduleList.length - 1 ? "last" : ""}`}
              >
                {idx === 0 && (
                  <TableHeader
                    rowSpan={scheduleList.length}
                    className="date"
                    scope="row"
                    isToday={isToday}
                    data-date={format(
                      new Date(year, month - 1, date),
                      "yyyyMMdd"
                    )}
                  >
                    <span>
                      {formatDateForTable(`${year}-${month}-${date}`)}
                    </span>
                  </TableHeader>
                )}
                <TableCell>{schedule.start_time.slice(0, 5)}</TableCell>
                <TableCell className="location">{schedule.location}</TableCell>
                <TableCell>
                  <TeamMatch
                    team1={schedule.team1}
                    team2={schedule.team2}
                    score1={schedule.score1}
                    score2={schedule.score2}
                    state={schedule.state}
                    team1_img={schedule.team1_img}
                    team2_img={schedule.team2_img}
                  />
                </TableCell>
              </TableRow>
            ));
          }

          return (
            <TableRow
              key={date}
              className={`empty ${tableRowClassNames(rowIdx, isToday)}`}
            >
              <TableHeader className="date" scope="row" isToday={isToday}>
                {formatDateForTable(`${year}-${month}-${date}`)}
              </TableHeader>
              <TableCell colSpan={3}>경기가 없습니다.</TableCell>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ScheduleTable;

const Table = styled.table`
  margin-top: 25px;
  width: 100%;
`;

const TableHead = styled.thead`
  background-color: #f3f3f3;
`;

const TableHeader = styled.th<{ isToday?: boolean }>`
  box-sizing: border-box;
  padding: 10px;
  border-top: 1px solid #f3f3f3;
  vertical-align: middle;
  text-align: center;
  ${(props) =>
    props.isToday &&
    css`
      border: 1px solid #5f30e2;
      color: #5f30e2;
      ::after {
        content: "오늘";
        font-size: 14px;
        display: block;
        margin-top: 5px;
      }
    `}

  &.date {
    border-right: 1px solid #f3f3f3;
  }
  span {
    font-weight: bold;
  }
`;

const TableRow = styled.tr`
  &.bg {
    background-color: #fbfafe;
  }
  &.empty {
    color: #999;
    font-size: 14px;
  }
  &.empty.today {
    td {
      border: 1px solid #5f30e2;
    }
  }
  &.today {
    border-right: 1px solid #5f30e2;
  }
  &.today.first > td {
    border-top: 1px solid #5f30e2;
  }
  &.today.last > td {
    border-bottom: 1px solid #5f30e2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-top: 1px solid #f3f3f3;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  &.location {
    color: #7c7b7b;
  }
`;

const DateColumn = styled.col`
  width: 15%;
`;

const TimeColumn = styled.col`
  width: 5%;
`;

const LocationColumn = styled.col`
  width: 15%;
`;

const GameColumn = styled.col`
  width: 65%;
`;
