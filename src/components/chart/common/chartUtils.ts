import { Chart } from 'chart.js';
import { WeatherData } from '../../../hooks/useWeatherData';

export const shadowPlugin = {
  id: 'shadowPlugin',
  beforeDatasetsDraw: function (chartInstance: Chart) {
    const _fill = chartInstance.ctx.fill;
    chartInstance.ctx.fill = function () {
      chartInstance.ctx.save();
      chartInstance.ctx.shadowColor = 'rgba(0, 0, 0, 1.5)';
      chartInstance.ctx.shadowBlur = 40;
      _fill.apply(this);
      chartInstance.ctx.restore();
    };
  },
};

type ChartConfig = {
  type: string;
  labels: string[];
  datasets: {
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
  }[];
  options: object;
};

export const getChartConfig = (weatherData: WeatherData): ChartConfig => {
  const { current } = weatherData;

  const temp_c =
    current.temp_c + 10 < 0 ? 1 : ((current.temp_c + 10) / 50) * 10;
  const humidity = current.humidity > 90 ? 10 : current.humidity / 9;
  const wind_kph = current.wind_kph > 40 ? 10 : (current.wind_kph / 40) * 10;

  const config = {
    type: 'radar',
    labels: ['Temperature', 'Humidity', 'Wind'],
    datasets: [
      {
        data: [temp_c, humidity, wind_kph],
        fill: true,
        backgroundColor: 'rgba(50, 30, 250, 0.4)',
        borderColor: 'rgba(50, 30, 250, 0.4)',
      },
    ],
    options: {
      scales: {
        // Note: for some reason, this config is not applied - despite matching the docs.
        // I would need more time to investigate this further.
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 10,
          ticks: {
            display: false,
          },
        },
      },
    },
  };

  return config;
};
