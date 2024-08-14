import React, { useMemo, useState } from 'react';
import { QueryClient } from 'react-query';
import { AxiosError } from 'axios';

import { Search } from '../components/Search';
import { CachedQueryButtons } from '../components/CachedQueryButtons';
import { ErrorMessage } from '../components/Error';
import { WeatherData } from '../hooks/useWeatherData';
import { ChartContainer } from '../components/chart/ChartContainer';

// To avoid having this state in two places (compoent state and query cache)
// We make sure that there are only 4 cached weather queries corresponding to the buttons
const handleCachedQueries = (queryClient: QueryClient, amount: number) => {
  const cachedQueryKeys: string[] = [];
  let cachedCityNames: string[] = [];

  const freshQueries = queryClient.getQueriesData({
    stale: false,
  });

  freshQueries.forEach(([query, data]) => {
    const cached = data as { status: number; data: WeatherData };
    const [queryKey] = query as string[];

    if (!queryKey.includes('get-weather')) {
      return;
    }

    const isDuplicate = cachedCityNames.some(
      (item) => item.toLowerCase() === cached.data.location.name.toLowerCase()
    );

    if (cached.status === 200 && !isDuplicate) {
      cachedQueryKeys.unshift(queryKey);
      cachedCityNames.unshift(cached.data.location.name);
      cachedCityNames = cachedCityNames.slice(0, amount);
    }
  });

  const keysToDelete = cachedQueryKeys.slice(amount);

  keysToDelete.forEach((queryKey: string) => {
    queryClient.removeQueries({ queryKey: [queryKey] });
  });

  return cachedCityNames;
};

export const CurrentWeatherPage = ({
  queryClient,
}: {
  queryClient: QueryClient;
}): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const cachedCityNames = useMemo(
    () => handleCachedQueries(queryClient, 4),
    [current]
  );

  const handleSearch = (value: string): void => {
    setError(null);
    setQuery(value);
  };

  const handleError = (error: AxiosError): void => {
    if (error.response?.status === 400) {
      setError(
        'Your search returned no results. Try again with a valid query.'
      );
    } else {
      setError('Oops! Something went wrong. Try again.');
    }
  };

  return (
    <div className="shadow-inner shadow-xl h-screen">
      <h1 className="text-2xl md:text-3xl lg:text-4xl pt-8 font-bold text-indigo-400 text-center pb-4">
        Find weather data for a city
      </h1>
      <Search onButtonClick={handleSearch} />
      <CachedQueryButtons cache={cachedCityNames} onItemClick={handleSearch} />
      {error && <ErrorMessage error={error} onClick={() => handleSearch('')} />}
      {!error && (
        <ChartContainer
          onSuccess={setCurrent}
          onError={handleError}
          query={query}
          current={current}
        />
      )}
    </div>
  );
};
