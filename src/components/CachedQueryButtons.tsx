import React from 'react';

type CachedQueryButtonProps = {
  cityName: string;
  onClick: (value: string) => void;
};

const CachedQueryButton = ({
  cityName,
  onClick,
}: CachedQueryButtonProps): JSX.Element => {
  return (
    <button
      className="flex py-2 md:py-3 px-2 sm:px-4 md:px-6 mx-1 max-h-12 md:max-h-14 sm:mx-2 brder-solid
        max-w-28 sm:max-w-64 text-sm sm:txt-base md:max-w-80  border-2 border-indigo-400 rounded-md
       bg-indigo-400 text-white text-center shadow overflow-hidden truncate"
      onClick={() => onClick(cityName)}
    >
      {cityName}
    </button>
  );
};

type CachedQueryButtonsProps = {
  cache: string[];
  onItemClick: (value: string) => void;
};

export const CachedQueryButtons = ({
  cache,
  onItemClick,
}: CachedQueryButtonsProps): JSX.Element => {
  if (!cache[0]) {
    return <div className="h-20 mb-1" />;
  }

  return (
    <div className="mx-auto w-94 py-2 mb-4 text-center">
      <div className="flex mx-auto  sm:md-[70vw] md:w-[50vw]  justify-center align-center">
        {cache.map((cityName) => (
          <CachedQueryButton
            cityName={cityName}
            onClick={onItemClick}
            key={cityName}
          />
        ))}
      </div>
    </div>
  );
};
