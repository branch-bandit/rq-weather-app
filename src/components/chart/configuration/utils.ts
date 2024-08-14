import { Chart, ChartOptions } from 'chart.js';

import { WeatherData } from '../../../hooks/useWeatherData';
import { baseChartConfig, baseChartOptions, gridFillDatasets } from './consts';

type ChartConfig = {
  type: string;
  labels: string[];
  datasets: {
    data: number[];
    fill?: boolean;
    pointRadius?: number;
    borderWidth?: number;
    backgroundColor?: string;
    borderColor?: string;
  }[];
};

export const formatChartData = (weatherData: WeatherData): ChartConfig => {
  const { current } = weatherData;

  // temperature scale - -10 to 40 degrees celsius
  const temp_c = current.temp_c + 10 < 0 ? 1 : (current.temp_c + 10) / 5;
  // humidity scale - 0-100% (we slightly bend it to look better with normal/low values)
  const humidity = current.humidity > 90 ? 10 : current.humidity / 9;
  // wnd scale - 0-40km/h
  const wind_kph = current.wind_kph > 40 ? 10 : (current.wind_kph / 40) * 10;

  const config = {
    ...baseChartConfig,
    datasets: [
      {
        data: [temp_c, humidity, wind_kph],
        fill: true,
        backgroundColor: 'rgba(50, 30, 240, 0.4)',
        borderColor: 'rgba(50, 30, 240, 0.4)',
        pointRadius: 4,
        pointHitRadius: 8,
      },
      ...gridFillDatasets,
    ],
  };

  return config;
};

export const getChartOptions = (weatherData: WeatherData): ChartOptions => ({
  ...baseChartOptions,
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem: { label: string }): string => {
          if (tooltipItem.label === 'Temperature') {
            return weatherData.current.temp_c.toString() + '°C';
          }
          if (tooltipItem.label === 'Humidity ') {
            return weatherData.current.humidity.toString() + '%';
          }
          if (tooltipItem.label === 'Wind spd') {
            return weatherData.current.wind_kph.toString() + ' km/h';
          }
          return '';
        },
      },
      padding: 10,
      titleFont: {
        size: 13,
      },
      bodyFont: {
        size: 13,
      },
      boxHeight: 14,
      boxWidth: 14,
      boxPadding: 4,
    },
  },
});

export const shadowPlugin = {
  id: 'shadowPlugin',
  beforeDatasetsDraw: (chartInstance: Chart) => {
    const _fill = chartInstance.ctx.fill;
    chartInstance.ctx.fill = function () {
      chartInstance.ctx.save();
      chartInstance.ctx.shadowColor = 'rgba(90, 70, 120, 0.8)';
      chartInstance.ctx.shadowBlur = 30;
      _fill.apply(this);
      chartInstance.ctx.restore();
    };
  },
};
