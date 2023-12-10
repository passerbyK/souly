"use client";

import React from "react";

import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import type { PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const highlightedDates = ["2023-12-06", "2023-12-08", "2023-12-30"];

function isDateHighlighted(date: Dayjs) {
  return highlightedDates.includes(date.format("YYYY-MM-DD"));
}

// 使用 PickersDayProps 來定義 ServerDay 元件的 props
type ServerDayProps = PickersDayProps<Dayjs>;

function ServerDay(props: ServerDayProps) {
  const { day, outsideCurrentMonth, ...other } = props;
  const isSelected = !outsideCurrentMonth && isDateHighlighted(day);

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🌚" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs("2023-12-06")}
        slots={{
          day: ServerDay,
        }}
      />
    </LocalizationProvider>
  );
}
