import React, { useEffect } from 'react';
import { UseQueryResult } from 'react-query';
import { AxiosError } from 'axios';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';

import { useWeatherData, WeatherData } from '../../hooks/useWeatherData';
import { getChartConfig, shadowPlugin } from './common/chartUtils';
import { Spinner } from '../Spinner';

type WeatherChartWithQueryProps = {
  query: string;
  current?: string;
  onSuccess: (data: WeatherData) => void;
  onError: (error: AxiosError) => void;
};

ChartJS.register(
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
  shadowPlugin
);

export const WeatherChartWithQuery = ({
  query,
  current,
  onSuccess,
  onError,
}: WeatherChartWithQueryProps): JSX.Element => {
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

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return (
    <div className="mh-80 h-92 md:h-2/5 mw-80 w-max md:w-2/5 m-auto mt-8">
      {data && <Radar data={getChartConfig(data)} plugins={[shadowPlugin]} />}
    </div>
  );
};
