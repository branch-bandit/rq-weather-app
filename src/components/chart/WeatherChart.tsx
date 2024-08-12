import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';

import { WeatherResponseData } from '../../hooks/useWeatherData';
import { getChartConfig, shadowPlugin } from './common/chartUtils';

ChartJS.register(
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
  shadowPlugin
);

export const WeatherChart = (data: WeatherResponseData): JSX.Element => {
  const chartData = getChartConfig(data.data);

  return (
    <div className="mh-80 h-92 md:h-2/5 mw-80 w-92 md:w-2/5 m-auto mt-8">
      <Radar data={chartData} plugins={[shadowPlugin]} />
    </div>
  );
};
