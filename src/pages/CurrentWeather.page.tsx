import React, { useState } from 'react';
import { AxiosError } from 'axios';

import { WeatherData } from '../hooks/useWeatherData';
import { Search } from '../components/Search';
import { WeatherChartWithQuery } from '../components/chart/WeatherChartWithQuery';
import { CACHE_STALE_TIME } from '../utils/consts';
import { WeatherChart } from '../components/chart/WeatherChart';
import { CachedQueryButtons } from '../components/CachedQueryButtons';
import { ErrorMessage } from '../components/Error';

export type CacheItem = {
  timestamp: number;
  name: string;
  data: WeatherData;
};

const getCachedItem = (
  query: string,
  cache: CacheItem[]
): CacheItem | undefined => {
  return cache.find((item) => query === item.name);
};

const getCachedItemIndex = (query: string, cache: CacheItem[]): number => {
  return cache.findIndex((item) => query === item.name);
};

export const CurrentWeatherPage = (): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const [cache, setCache] = useState<CacheItem[]>([]);
  const [shouldUseCache, setShouldUseCache] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSuccess = (data: WeatherData): void => {
    const cachedItemIndex = getCachedItemIndex(data.location.name, cache);

    const newItem = {
      timestamp: new Date().getTime(),
      name: data?.location?.name,
      data,
    };

    if (cachedItemIndex !== -1) {
      const newCache = [...cache];

      newCache[cachedItemIndex] = newItem;
      setCache(newCache);

      return;
    }

    const cacheNewestToOldest = [...cache].sort(
      (a, b) => b.timestamp - a.timestamp
    );

    const newCache = [newItem, ...cacheNewestToOldest].slice(0, 4);

    setCache(newCache);
  };

  const onError = (error: AxiosError): void => {
    if (error.response?.status === 400) {
      setError(
        'Your search returned no results. Try again with a valid query.'
      );
    } else {
      setError('Oops! Something went wrong. Try again.');
    }
  };

  const setQueryWithCache = (value: string) => {
    setError(null);

    const cachedItem = getCachedItem(value, cache);

    if (!cachedItem) {
      setShouldUseCache(false);
      setQuery(value);
      return;
    }

    const currentTime = new Date().getTime();
    const itemIsValid = currentTime - cachedItem.timestamp < CACHE_STALE_TIME;

    if (!itemIsValid) {
      setShouldUseCache(false);
      setQuery(value);
      return;
    }

    setShouldUseCache(true);
    setQuery(value);
  };

  const cachedItem = getCachedItem(query, cache);

  return (
    <div>
      <h1 className="text-2xl my-3 font-bold text-indigo-400 text-center">
        Find weather data for a city
      </h1>
      <Search onButtonClick={setQueryWithCache} />
      <CachedQueryButtons cache={cache} onItemClick={setQueryWithCache} />
      {error && <ErrorMessage error={error} onClick={() => setError(null)} />}
      {!error && shouldUseCache && cachedItem ? (
        <WeatherChart data={cachedItem.data} />
      ) : (
        <WeatherChartWithQuery
          onSuccess={onSuccess}
          onError={onError}
          query={query}
          current={cachedItem?.data?.location.name}
        />
      )}
    </div>
  );
};
