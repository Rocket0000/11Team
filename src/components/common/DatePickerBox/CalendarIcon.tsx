import * as React from "react";
import styled from "styled-components";

const CalendarIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <path
      fill="#5F30E2"
      d="M0 12v-1.5C0 6.364 3.365 3 7.5 3H9V1.5a1.5 1.5 0 1 1 3 0V3h12V1.5a1.5 1.5 0 1 1 3 0V3h1.5c4.136 0 7.5 3.364 7.5 7.5V12H0Zm36 3v13.5c0 4.136-3.364 7.5-7.5 7.5h-21C3.364 36 0 32.636 0 28.5V15h36ZM18 28.5a1.5 1.5 0 0 0-1.5-1.5H9a1.5 1.5 0 1 0 0 3h7.5a1.5 1.5 0 0 0 1.5-1.5Zm10.5-6A1.5 1.5 0 0 0 27 21H9a1.5 1.5 0 1 0 0 3h18a1.5 1.5 0 0 0 1.5-1.5Z"
    />
  </svg>
);

export default CalendarIcon;