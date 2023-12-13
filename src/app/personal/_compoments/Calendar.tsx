"use client";

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const fromDate = new Date(2023, 11, 1);
const toDate = new Date(2024, 0, 30);

const today = new Date();
const todayStyle = { border: '2px solid black' };

const succeddDays = [new Date(2023, 11, 1), new Date(2023, 11, 2), new Date(2023, 11, 3), new Date(2023, 11, 4), new Date(2023, 11, 5), new Date(2023, 11, 10), new Date(2023, 11, 11), new Date(2023, 11, 12)];
const successStyle = { 
  backgroundColor: '#FBEFDF',
};

const failDays = [new Date(2023, 11, 6), new Date(2023, 11, 7), new Date(2023, 11, 8), new Date(2023, 11, 9)];
const failStyle = { 
  backgroundColor: 'rgba(251,239,223,0.4)',
  color: 'rgba(0,0,0,0.4)',
};

function Calendar() {

  return (
    <>
    <style>
        {`
          .rdp {
            --rdp-cell-size: 28px;
          }
          .rdp-day {
            margin: 3px;
          }

        `}
      </style>
    <DayPicker 
      defaultMonth={new Date(2023, 11, 1)}
      fromDate={fromDate}
      toDate={toDate}
      modifiers={{ today: today, successDays: succeddDays, failDays: failDays}}
      modifiersStyles={{ today: todayStyle, successDays: successStyle, failDays: failStyle }}
    />
    </>
  )
}

export default Calendar;
