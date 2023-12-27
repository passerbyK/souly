"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type CalendarProps = {
  startDay: Date;
  endDay: Date;
  successDays: Date[];
};

const todayStyle = { border: "2px solid black" };
const successStyle = {
  backgroundColor: "#FBEFDF",
};
const failStyle = {
  backgroundColor: "rgba(251,239,223,0.4)",
  color: "rgba(0,0,0,0.4)",
};

function Calendar({ startDay, endDay, successDays }: CalendarProps) {
  // 將時間部分設置為零
  startDay.setUTCHours(0, 0, 0, 0);
  endDay.setUTCHours(0, 0, 0, 0);

  // 將 successDays 陣列中每個日期的時間部分設置為零
  const successDay = successDays.map((date) => {
    const dateWithoutTime = new Date(date);
    dateWithoutTime.setUTCHours(0, 0, 0, 0);
    return dateWithoutTime;
  });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const failsDays = [];
  for (
    let currentDay = new Date(startDay);
    currentDay <= endDay;
    currentDay.setDate(currentDay.getDate() + 1)
  ) {
    console.log(currentDay);
    const isInSuccessDays = successDay.some(
      (successDay) => successDay.getDate() === currentDay.getDate(),
    );
    if (!isInSuccessDays) {
      failsDays.push(new Date(currentDay));
    }
  }

  return (
    <>
      <style>
        {`
          .rdp {
            --rdp-cell-size: 40px;
          }
          .rdp-day {
            margin: 3px;
            margin-top: 6px;
          }
          .rdp-day span {
            font-size: 20px; /* Adjust the font size as needed */
          }

        `}
      </style>
      <DayPicker
        defaultMonth={startDay}
        fromDate={startDay}
        toDate={endDay}
        modifiers={{
          today: today,
          successDays: successDays,
          failDays: failsDays,
        }}
        modifiersStyles={{
          today: todayStyle,
          successDays: successStyle,
          failDays: failStyle,
        }}
      />
    </>
  );
}

export default Calendar;
