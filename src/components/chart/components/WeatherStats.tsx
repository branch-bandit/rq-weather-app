import React, { PropsWithChildren } from 'react';
import { WeatherData } from '../../../hooks/useWeatherData';
import { CityIcon } from '../icons/CityIcon';
import { CountryIcon } from '../icons/CountryIcon';
import { TimeIcon } from '../icons/TimeIcon';
import { TempIcon } from '../icons/TempIcon';
import { WindIcon } from '../icons/WindIcon';
import { HumidIcon } from '../icons/HumidIcon';

const StatsItem = ({
  width,
  ...props
}: PropsWithChildren<{ width?: string }>): JSX.Element => (
  <span
    className={`h-12 ${width ? width : 'w-20 sm:w-24 md:w-30'} flex space-x-1 items-center justify-center mx-auto`}
  >
    {props.children}
  </span>
);

export const WeatherStats = ({ data }: { data?: WeatherData }): JSX.Element => {
  return (
    <div
      className="grid grid-cols-3 md:grid-cols-6 gap-6 px-2 md:px-6 lg:px-12 mx-2 md:mx-8 lg:mx-20 xl:mx-44
      xl2-mx-56 text-gray-600 text-sm sm:text-base"
    >
      <StatsItem>
        <CityIcon className="min-w-5 min-h-5" />
        {data && <p className="px-[3px]"> {data.location.name}</p>}
      </StatsItem>
      <StatsItem>
        <CountryIcon className="min-w-5 min-h-5" />
        {data && <p className="px-[3px]"> {data.location.country} </p>}
      </StatsItem>
      <StatsItem>
        <TimeIcon />
        {data && (
          <p className="px-[3px]">
            {new Date(data.location.localtime)
              .toLocaleTimeString()
              .substring(0, 5)}
          </p>
        )}
      </StatsItem>
      <StatsItem>
        <TempIcon />
        {data && <p className="px-[3px]"> {data.current.temp_c + '°C'}</p>}
      </StatsItem>
      <StatsItem>
        <HumidIcon />
        {data && <p className="px-[3px]"> {data.current.humidity + '%'}</p>}
      </StatsItem>
      <StatsItem width="w-24 md:w-30">
        <WindIcon className="min-w-5 min-h-5" />
        {data && (
          <p className="px-[3px] whitespace-nowrap">
            {data.current.wind_kph + ' km/h'}
          </p>
        )}
      </StatsItem>
    </div>
  );
};
