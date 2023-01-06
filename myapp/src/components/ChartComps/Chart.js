import React from 'react';

import ChartBar from './ChartBar';

const Chart = ({ dataPoints }) => {
  return (
    <div className='chart'>
      {dataPoints.map((dataPoint) => {
        return <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxVal={dataPoint.maxVal}
          label={dataPoint.label}
        />;
      })}
    </div>
  );
};
