"use client"
import * as React from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs'; 
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

const highlightedDates = ['2023-12-06', '2023-12-08', '2023-12-30'];

function isDateHighlighted(date: Dayjs) {
  return highlightedDates.includes(date.format('YYYY-MM-DD'));
}

// 使用 React.ComponentProps<typeof PickersDay> 定義 ServerDay 元件的 props
type ServerDayProps = React.ComponentProps<typeof PickersDay>;

function ServerDay(props: ServerDayProps) {
  const { day, outsideCurrentMonth, ...other } = props;
  const dayAsDayjs = day as Dayjs; // 這裡使用 Dayjs 斷言
  const isSelected = !outsideCurrentMonth && isDateHighlighted(dayAsDayjs);

  return (
    <Badge key={dayAsDayjs.toString()} overlap="circular" badgeContent={isSelected ? '🌚' : undefined}>
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function Calendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs('2023-12-06')}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDates,
          } as any,
        }}
      />
    </LocalizationProvider>
  );
}