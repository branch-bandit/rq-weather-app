import { ChartOptions, ChartTypeRegistry, PluginOptionsByType } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

const baseGridFillDataset = {
  pointRadius: 0,
  pointHitRadius: 0,
  borderWidth: 0,
  fill: true,
};

export const gridFillDatasets = [
  {
    ...baseGridFillDataset,
    backgroundColor: 'rgba(213, 203, 200, 0.5)',
    data: [2, 2, 2],
  },
  {
    ...baseGridFillDataset,
    backgroundColor: 'rgba(213, 183, 242, 0.4)',
    data: [4, 4, 4],
  },
  {
    ...baseGridFillDataset,
    backgroundColor: 'rgba(213, 183, 242, 0.3)',
    data: [6, 6, 6],
  },
  {
    ...baseGridFillDataset,
    backgroundColor: 'rgba(213, 183, 242, 0.2)',
    data: [8, 8, 8],
  },
  {
    ...baseGridFillDataset,
    backgroundColor: 'rgba(213, 183, 242, 0.1)',
    data: [10, 10, 10],
  },
];

export const baseChartConfig = {
  type: 'radar',
  labels: ['Temperature', 'Humidity ', 'Wind spd'],
  datasets: gridFillDatasets,
};

export const baseChartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    point: {
      radius: 3,
      hitRadius: 6,
    },
  } as _DeepPartialObject<PluginOptionsByType<keyof ChartTypeRegistry>>,
  scales: {
    r: {
      // @ts-expect-error - caused by customizing the scale
      type: 'derivedRadialLinearScale',
      ticks: {
        display: false,
        stepSize: 2,
      },
      angleLines: {
        display: true,
        color: '#90B7DA',
        lineWidth: 1,
      },
      suggestedMin: 1,
      suggestedMax: 10,
      pointLabels: {
        font: {
          family: 'Open Sans',
          size: 13,
          weight: '300',
        },
        padding: 10,
        color: 'rgba(0,0,0,0.6)',
        backdropPadding: 2,
        borderRadius: 4,
      },
    },
  },
};
