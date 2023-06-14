import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import "./calendar.css";
import { forwardRef } from "react";

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);
  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <input
      value={value}
      className="example-custom-input"
      onClick={onClick}
      onChange={onChange}
      ref={ref}
    />
  ));

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
      dayClassName={() => "example-datepicker-day-class"}
      popperPlacement="bottom-start"
      dateFormat="dd / MM / yyyy"
      todayButton="TODAY"
      showYearDropdown
    />
  );
};

export default Calendar;
