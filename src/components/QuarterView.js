// QuarterView.js
import React, { useState } from "react";
import MonthView from "./MonthView";
import { getMonthName } from "../Utility/CalendarUtils.js";
import "..//styles/QuarterViewCalendar.css";

const QuarterView = ({ selectedCountry, holidayMode = false }) => {
  const today = new Date();
  const [baseMonth, setBaseMonth] = useState(today.getMonth()); // 0-11
  const [year, setYear] = useState(today.getFullYear());

  const goToPreviousQuarter = () => {
    if (baseMonth < 3) {
      setBaseMonth(9);
      setYear((y) => y - 1);
    } else {
      setBaseMonth((m) => m - 3);
    }
  };

  const goToNextQuarter = () => {
    if (baseMonth > 8) {
      setBaseMonth(0);
      setYear((y) => y + 1);
    } else {
      setBaseMonth((m) => m + 3);
    }
  };

  const monthsToShow = [baseMonth, baseMonth + 1, baseMonth + 2];

  return (
    <div className="quarterly-calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousQuarter}>&lt;</button>
        <h2>
          {monthsToShow.map((m) => getMonthName(m % 12)).join(", ")} {year} –{" "}
          {selectedCountry.name}
        </h2>
        <button onClick={goToNextQuarter}>&gt;</button>
      </div>
      <div className="quarterly-view-grid">
        {monthsToShow.map((month, idx) => (
          <div key={idx} className="month-grid">
            <MonthView
              selectedCountry={selectedCountry}
              overrideMonth={month % 12}
              overrideYear={year + Math.floor(month / 12)}
              isQuarterly
              holidayMode={holidayMode}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuarterView;
