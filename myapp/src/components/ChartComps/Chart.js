import React from 'react';

import ChartBar from './ChartBar';

const Chart = ({ dataPoints }) => {
  // Find max from all values passed to calc fill %ge
  const dpValues = dataPoints.map((dpVal) => dpVal.value);
  const totalMax = Math.max(...dpValues);
  return (
    <div className='chart'>
      {dataPoints.map((dataPoint) => {
        return (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxVal={totalMax}
            label={dataPoint.label}
          />
        );
      })}
    </div>
  );
};

export default Chart;
