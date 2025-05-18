// CalendarUtils.js

// Generate weeks of a given month with empty date placeholders
export const getWeeksInMonth = (year, month) => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  const weeks = [];

  let currentWeek = [];
  let date = new Date(startDate);

  while (date <= endDate) {
    const weekday = (date.getDay() + 6) % 7; // Make Monday = 0
    if (currentWeek.length === 0 && weekday > 0) {
      currentWeek = Array(weekday).fill({ date: '', isHoliday: false, name: '' });
    }

    const dayObj = {
      date: date.getDate(),
      isHoliday: false,
      name: ''
    };

    currentWeek.push(dayObj);

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    date.setDate(date.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: '', isHoliday: false, name: '' });
    }
    weeks.push(currentWeek);
  }

  return weeks;
};

// Highlight logic based on non-weekend holidays only
export const getHolidaysByWeek = (weekDays) => {
  const weekdaysOnly = weekDays.filter((day, idx) => {
    return (
      day.date !== '' &&
      day.isHoliday &&
      idx !== 5 && // Saturday
      idx !== 6    // Sunday
    );
  });

  const count = weekdaysOnly.length;
  let colorClass = '';
  if (count > 1) colorClass = 'row-darkgreen';
  else if (count === 1) colorClass = 'row-lightgreen';

  return { colorClass, weekDays };
};

// Fetch holidays for a given country code and year
export const fetchHolidays = async (countryCode, year) => {
  const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
  if (!response.ok) throw new Error('Failed to fetch holidays');
  const data = await response.json();

  const holidayMap = {};
  data.forEach((holiday) => {
    holidayMap[holiday.date] = holiday.localName;
  });

  return holidayMap;
};

// Convert 0-based month index to month name
export const getMonthName = (monthIndex) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[monthIndex];
};

export const fetchAvailableCountries = async () => {
  const response = await fetch('https://date.nager.at/api/v3/AvailableCountries');
  if (!response.ok) throw new Error('Failed to fetch country list');
  const data = await response.json(); // [{ name: "India", countryCode: "IN" }, ...]
  return data;
};
