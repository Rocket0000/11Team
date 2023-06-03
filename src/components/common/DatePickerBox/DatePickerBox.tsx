import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { format, getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./DatePickerBox.module.css";
import "./DatePickerBox.css";

interface Props {
  selectedDate: Date | null;
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
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

const DatePickerBox = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const YEARS = Array.from(
    { length: getYear(new Date()) + 1 - 2000 },
    (_, i) => getYear(new Date()) - i
  );
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
  return (
    <DatePicker
      dateFormat={`yyyy.MM.dd (${getDayOfWeek(selectedDate)})`}
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      minDate={new Date("2000-01-01")}
      maxDate={new Date()}
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

export default DatePickerBox;
