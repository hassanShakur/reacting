import React from 'react';

const ChartBar = ({ value, maxVal, label }) => {
  let fillHeight = maxVal > 0 ? Math.round(value / maxVal * 100) + '%' : '0%';

  return (
    <div className='chart-bar'>
      <div className='chart-bar__inner'>
        <div className='chart-bar__fill' style={{ height: fillHeight }}></div>
      </div>
      <div className='chart-bar__label'>{label}</div>
    </div>
  );
};

export default ChartBar;
