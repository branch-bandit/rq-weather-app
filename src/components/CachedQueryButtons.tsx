import React from 'react';

import { CacheItem } from '../pages/CurrentWeather.page';

type CachedQueryButtonProps = {
  item: CacheItem;
  onClick: (value: string) => void;
};

const CachedQueryButton = ({
  item,
  onClick,
}: CachedQueryButtonProps): JSX.Element => {
  return (
    <button
      className="py-2 flex px-2 sm:px-4 md:px-6 my-1 mx-1 max-h-10 md:max-h-14 overflow-y-hidden sm:mx-2 max-w-24 sm:max-w-64 md:max-w-80 order-solid border-2 border-indigo-400 rounded-md bg-indigo-400 text-white text-center"
      onClick={() => onClick(item.name)}
    >
      {item.name}
    </button>
  );
};

type CachedQueryButtonsProps = {
  cache: CacheItem[];
  onItemClick: (value: string) => void;
};

export const CachedQueryButtons = ({
  cache,
  onItemClick,
}: CachedQueryButtonsProps): JSX.Element => {
  return (
    <div className="m-auto w-screen mb-2">
      <div className="flex w-max m-auto">
        {cache.map((item) => (
          <CachedQueryButton
            item={item}
            onClick={onItemClick}
            key={item.name}
          />
        ))}
      </div>
    </div>
  );
};
