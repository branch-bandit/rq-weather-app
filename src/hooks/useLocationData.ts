import {
  QueryFunction,
  QueryFunctionContext,
  useQuery,
  UseQueryResult,
} from 'react-query';
import axios, { AxiosError } from 'axios';

import { API_BASE_URL, CACHE_STALE_TIME } from '../utils/consts';

const apiKey = process.env.REACT_APP_API_KEY;

export type UseLocationDataOptions = {
  onSuccess?: (data: LocationItem[]) => void;
  onError?: (error: AxiosError) => void;
  searchTerm: string;
  isFocused?: boolean;
};

export type LocationItem = {
  id: string;
  name: string;
};

export type LocationResponseData = {
  data: LocationItem[];
};

const getSearchQueryKey = (query: string): string => {
  return `search-${query.toLowerCase()}`;
};

const fetchCities: QueryFunction<LocationResponseData, [string, string]> = (
  param: QueryFunctionContext
): Promise<LocationResponseData> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, cityName] = param.queryKey;
  return axios.get(`${API_BASE_URL}/search.json?q=${cityName}&key=${apiKey}`);
};

export const useLocationData = ({
  onSuccess,
  onError,
  searchTerm,
  isFocused,
}: UseLocationDataOptions): UseQueryResult<LocationItem[], AxiosError> => {
  const enabled = searchTerm !== '' && searchTerm.length > 2 && isFocused;

  return useQuery([getSearchQueryKey(searchTerm), searchTerm], fetchCities, {
    onSuccess: onSuccess,
    onError: onError,
    select: (data: LocationResponseData) => data.data,
    refetchInterval: false,
    enabled: enabled,
    staleTime: CACHE_STALE_TIME,
    cacheTime: CACHE_STALE_TIME,
    refetchIntervalInBackground: false,
    retry: false,
  });
};
