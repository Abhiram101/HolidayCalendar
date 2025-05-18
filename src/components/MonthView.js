import React, { useState, useEffect } from "react";
import HolidayTooltip from "./HolidayToolTip";
import {
  getWeeksInMonth,
  getHolidaysByWeek,
  getMonthName,
  fetchHolidays,
} from "../Utility/CalendarUtils.js";
import "../styles/MonthViewCalendar.css";

const MonthView = ({
  selectedCountry,
  overrideMonth,
  overrideYear,
  isQuarterly = false,
}) => {
  const today = new Date();
  const [month, setMonth] = useState(overrideMonth ?? today.getMonth());
  const [year, setYear] = useState(overrideYear ?? today.getFullYear());
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    if (overrideMonth !== undefined) setMonth(overrideMonth);
    if (overrideYear !== undefined) setYear(overrideYear);
  }, [overrideMonth, overrideYear]);

  useEffect(() => {
    const loadHolidays = async () => {
      try {
        const holidayMap = await fetchHolidays(
          selectedCountry.countryCode,
          year
        );
        const rawWeeks = getWeeksInMonth(year, month);

        const weeksWithHolidays = rawWeeks.map((week) =>
          week.map((dayObj, index) => {
            if (!dayObj.date) return dayObj;
            const fullDate = formatDate(year, month, dayObj.date); // e.g., "2025-01-26"
            const isHoliday = holidayMap[fullDate] !== undefined;
            return {
              ...dayObj,
              isHoliday,
              name: isHoliday ? holidayMap[fullDate] : "",
            };
          })
        );

        setWeeks(weeksWithHolidays);
      } catch (err) {
        console.error("Error fetching holidays:", err);
        setWeeks(getWeeksInMonth(year, month)); // fallback
      }
    };

    loadHolidays();
  }, [month, year, selectedCountry]);

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const formatDate = (year, month, day) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  return (
    <div className={`monthly-calendar ${!isQuarterly ? "compact" : ""}`}>
      <div className="calendar-header">
        {!isQuarterly && <button onClick={goToPreviousMonth}>&lt;</button>}
        <h2>
          {getMonthName(month)} {year} – {selectedCountry.name}
        </h2>
        {!isQuarterly && <button onClick={goToNextMonth}>&gt;</button>}
      </div>

      <div className="calendar-grid headers">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      {weeks.map((week, i) => {
        const { colorClass, weekDays } = getHolidaysByWeek(week);
        return (
          <div className={`calendar-grid ${colorClass}`} key={i}>
            {weekDays.map((day, idx) => (
              <div
                className={`cell ${!isQuarterly ? "compact" : ""}`}
                key={idx}
              >
                {day.date}
                {day.isHoliday && <HolidayTooltip name={day.name} />}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MonthView;
