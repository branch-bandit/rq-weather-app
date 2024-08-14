import React, { useEffect } from 'react';
import { UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

import { useWeatherData, WeatherData } from '../../hooks/useWeatherData';
import CustomRadialLinearScale from './configuration/customRadialLinearScale';
import {
  formatChartData,
  getChartOptions,
  shadowPlugin,
} from './configuration/utils';
import { WeatherStats } from './components/WeatherStats';
import { Spinner } from './components/Spinner';
import { baseChartConfig, baseChartOptions } from './configuration/consts';

type WeatherChartProps = {
  query: string;
  current?: string;
  onSuccess: (cityName: string) => void;
  onError: (error: AxiosError) => void;
};

ChartJS.register(
  CustomRadialLinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Filler,
  shadowPlugin
);

export const ChartContainer = ({
  query,
  current,
  onSuccess,
  onError,
}: WeatherChartProps): JSX.Element => {
  const {
    isLoading,
    isFetching,
    data,
    refetch,
  }: UseQueryResult<WeatherData, AxiosError> = useWeatherData({
    onSuccess,
    onError,
    cityName: query,
    current,
  });

  useEffect(() => {
    if (query !== '') {
      refetch();
    }
  }, [query]);

  return (
    <div className="mx-1 sm:mx-2 md:mx-4 ">
      <>
        <WeatherStats data={data && data} />
        <div
          className="md:h-4/5 max-w-full md:max-w-7xl w-9/10 md:w-4/5 lg:w-3/5 mx-auto
            sm:px-[6rem] md:px-[5rem] lg:px-[3rem] xl:px-[8rem] py-[1rem] mx-auto ml-[2vw] md:mx-auto mt-12 md:mt-6"
        >
          {(isLoading || isFetching) && <Spinner />}
          <Radar
            data={data ? formatChartData(data) : baseChartConfig}
            plugins={[shadowPlugin]}
            // @ts-expect-error - TS doesn't like the  modified radial linear scale
            options={data ? getChartOptions(data) : baseChartOptions}
          />
        </div>
      </>
    </div>
  );
};
