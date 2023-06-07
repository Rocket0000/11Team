import React, { Dispatch, SetStateAction, forwardRef, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { format, getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import styles from "../../../styles/DatePickerBox.module.scss";
import "../../../styles/DatePickerBox.scss";
import CalendarIcon from "./CalendarIcon";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  value?: string;
  onClick?: () => void;
  purpose: "main" | "schedule";
}

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  purpose: string;
}

const getDayOfWeek = (date: any) => {
  const WEEKS: ReadonlyArray<string> = [
    "일",
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
  ];
  const dayOfWeek = WEEKS[new Date(date).getDay()];
  return dayOfWeek;
};

const MONTHS: ReadonlyArray<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DatePickerBox: React.FC<Props> = ({
  purpose,
  setSelectedDate,
  selectedDate,
}) => {
  const YEARS = Array.from(
    { length: getYear(new Date()) + 1 - 2000 },
    (_, i) => getYear(new Date()) - i
  );

  const CustomInput: React.FC<CustomInputProps> = forwardRef(
    ({ value, onClick, purpose }, ref) =>
      purpose === "main" ? (
        <MainInput onClick={onClick}>{value}</MainInput>
      ) : (
        <ScheduleInput onClick={onClick}>
          {value}
          <CalendarIcon />
        </ScheduleInput>
      )
  );
  return (
    <DatePicker
      customInput={<CustomInput purpose={purpose} />}
      dateFormat={
        purpose === "main"
          ? `yyyy.MM.dd (${getDayOfWeek(selectedDate)})`
          : "yyyy.MM"
      }
      selected={selectedDate}
      onChange={(date: Date) => setSelectedDate(date)}
      minDate={new Date("2000-01-01")}
      shouldCloseOnSelect
      yearDropdownItemNumber={100}
      calendarClassName={styles.calenderWrapper}
      dayClassName={(d) =>
        d.getDate() === selectedDate!.getDate()
          ? styles.selectedDay
          : styles.unselectedDay
      }
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div className={styles.customHeaderContainer}>
          <div className={styles.monthBox}>
            <select
              className={styles.month}
              value={MONTHS[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(MONTHS.indexOf(value))
              }
            >
              {MONTHS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <select
            className={styles.year}
            value={getYear(date)}
            // @ts-expect-error NOTE: changeYear은 num을 받으나 target value는 string임
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {YEARS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
};

const MainInput = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline-style: none;
  border: none;
  color: transparent;
  text-shadow: 0 0 0 black;
  background-color: white;
  cursor: pointer;
  width: 140px;
  font-size: 16px;
  margin: 5px;
`;
const ScheduleInput = styled.button`
  display: flex;
  justify-content: space-around;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline-style: none;
  border: none;
  color: transparent;
  text-shadow: 0 0 0 black;
  background-color: white;
  cursor: pointer;
  width: 210px;
  font-size: 40px;
  margin: 5px;
  align-items: center;
`;

export default DatePickerBox;
