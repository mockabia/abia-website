import React, { useEffect, useRef } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import "./calendar.css";
import { forwardRef } from "react";

const Calendar = ({ onChange, onFormSubmit }) => {
  const [startDate, setStartDate] = useState(null);
  const inputRef = useRef(null);

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, onChange, onkeyDown }, ref) => (
      <input
        value={value}
        className="example-custom-input"
        onClick={onClick}
        onChange={onChange}
        // onKeyDown={(e) => e.preventDefault()}
        onKeyDown={onkeyDown}
        ref={ref}
        inputMode="none"
      />
    )
  );

  useEffect(() => {
    return () => {
      setStartDate(null);
    };
  }, [onFormSubmit]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !startDate) {
      e.preventDefault();
      inputRef.current.setFocus();
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      customInput={
        <ExampleCustomInput onKeyDown={handleKeyDown} ref={inputRef} />
      }
      dayClassName={() => "example-datepicker-day-class"}
      popperPlacement="bottom-start"
      showYearDropdown
      dateFormat="dd / MM / yyyy"
    />
  );
};

export default Calendar;
