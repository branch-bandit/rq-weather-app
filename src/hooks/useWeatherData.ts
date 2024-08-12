import {
  QueryFunction,
  QueryFunctionContext,
  useQuery,
  UseQueryResult,
} from 'react-query';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL, CACHE_STALE_TIME } from '../utils/consts';

const apiKey = process.env.REACT_APP_API_KEY;

export type UseWeatherDataOptions = {
  onSuccess: (data: WeatherData) => void;
  onError: (error: AxiosError) => void;
  cityName: string;
  current?: string;
};

export type WeatherData = {
  current: {
    temp_c: number;
    temp_f: number;
    wind_kph: number;
    wind_mph: number;
    wind_degree: number;
    pressure_mb: number;
    humidity: number;
  };
  location: {
    name: string;
  };
};

export type WeatherResponseData = {
  data: WeatherData;
};

const fetchWeather: QueryFunction<WeatherResponseData, [string, string]> = (
  param: QueryFunctionContext
): Promise<WeatherResponseData> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, cityName] = param.queryKey;

  return axios.get(`${API_BASE_URL}/current.json?key=${apiKey}&q=${cityName}`);
};

export const useWeatherData = ({
  onSuccess,
  onError,
  cityName,
  current,
}: UseWeatherDataOptions): UseQueryResult<WeatherData, AxiosError> => {
  return useQuery(['get-weather', cityName], fetchWeather, {
    onSuccess,
    onError,
    select: (data: WeatherResponseData) => data.data,
    enabled: !!cityName && cityName !== current,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: CACHE_STALE_TIME,
    cacheTime: CACHE_STALE_TIME,
    retry: 1,
  });
};
