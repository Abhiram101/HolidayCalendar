// HolidayTooltip.js
import React, { useState } from 'react';
import '../styles/Calendar.css';

const HolidayTooltip = ({ name }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div className="holiday-dot"></div>
      {visible && <div className="tooltip">{name}</div>}
    </div>
  );
};

export default HolidayTooltip;
