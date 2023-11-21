import React, { useEffect, useRef } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import "./calendar.css";
import { forwardRef } from "react";

const Calendar = forwardRef(({ onChange, onBlur }, ref) => {
  const [startDate, setStartDate] = useState(null);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, onChange, onkeyDown, onBlur }, ref) => (
      <input
        value={value}
        className="example-custom-input"
        onClick={onClick}
        onChange={onChange}
        onKeyDown={onkeyDown}
        onBlur={() => {
          setTouched(true);
          onBlur && onBlur();
        }}
        ref={ref}
        inputMode="none"
      />
    )
  );

  useEffect(() => {
    return () => {
      setStartDate(null);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !startDate) {
      e.preventDefault();
      inputRef.current.setFocus();
    }
  };
  const handleDateChange = (date) => {
    setStartDate(date);

    // Validate the date
    if (!date && touched) {
      setError("Please select a date.");
    } else {
      setError("");
    }

    // Pass the selected date to the parent component
    onChange && onChange(date);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        customInput={
          <ExampleCustomInput
            onKeyDown={handleKeyDown}
            ref={inputRef}
            onBlur={() => {
              setTouched(true);
              onBlur && onBlur();
            }}
          />
        }
        dayClassName={() => "example-datepicker-day-class"}
        popperPlacement="bottom-start"
        showYearDropdown
        dateFormat="dd / MM / yyyy"
      />
      <div> {error && <p className="text-red-500">{error}</p>}</div>
    </div>
  );
});

export default Calendar;
