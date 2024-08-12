import React from 'react';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { trim } from 'lodash';

import { useDebounce } from '../hooks/useDebounce';
import { LocationItem, useLocationData } from '../hooks/useLocationData';

type SuggestionsProps = {
  data: LocationItem[];
  activeElement: number;
  handleListItemClick: (value: string) => void;
  hide: () => void;
  show: () => void;
  setActiveElement: (value: number) => void;
};

const Suggestions = ({
  data,
  activeElement,
  handleListItemClick,
  hide,
  show,
  setActiveElement,
}: SuggestionsProps): JSX.Element => {
  const getBgColour = (itemIndex: number) =>
    itemIndex === activeElement ? 'bg-blue-200' : 'bg-blue-100';

  return (
    <div
      className="w-3/5 md:w-96 relative"
      onMouseLeave={hide}
      onMouseEnter={show}
    >
      <ul className="flex flex-col absolute w-full mr-2 md:w-94 px-1 py-1 bg-blue-50 divide-y divide-indigo-100">
        {data.map((item: LocationItem, index: number) => (
          <button
            onMouseEnter={() => setActiveElement(index)}
            key={`btn-${item.id}`}
            onClick={() => {
              handleListItemClick(data[activeElement]?.name);
            }}
          >
            <li
              key={item.id}
              className={`block text-gray-600 py-1 ${getBgColour(index)}`}
            >
              {item?.name}
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
};

const SearchButton = ({
  onClick,
  disabled,
  onMouseEnter,
}: Partial<ButtonHTMLAttributes<HTMLButtonElement>>): JSX.Element => {
  return (
    <button
      className="flex p-2 w-2/5 md:w-wit pr-8 border-solid border-2 border-indigo-400 rounded-md bg-indigo-400 text-white"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
    >
      <svg
        className="w-4 h-4 text-white mx-3 my-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <span className="hidden md:block">Fetch current weather</span>
      <span className="md:hidden block">Fetch</span>
    </button>
  );
};

export type SearchBoxProps = {
  onButtonClick: (value: string) => void;
};

export const Search = ({ onButtonClick }: SearchBoxProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [activeElement, setActiveElement] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(search, trim(search), 300);
  const trimmedSearch = trim(search);

  const { data } = useLocationData({
    searchTerm: debouncedSearchTerm,
    isFocused: focused,
  });

  useEffect(() => {
    if (data && data[0]) {
      setActiveElement(0);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [data]);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!data || !data[0]) {
      return;
    }
    if (event.keyCode === 38 && activeElement > 0) {
      setActiveElement(activeElement - 1);
    }
    if (event.keyCode === 40 && activeElement < data.length - 1) {
      setActiveElement(activeElement + 1);
    }
    if (event.keyCode === 13 && data[activeElement]?.name) {
      setSearch(data[activeElement].name);
      setShowDropdown(false);
    }
  };

  const handleListItemClick = (value: string): void => {
    if (!value) {
      return;
    }

    setSearch(value);
    setShowDropdown(false);
  };

  return (
    <div className="m-auto w-max mb-2">
      <span className="flex">
        <input
          onFocus={() => setFocused(true)}
          onMouseEnter={() => setFocused(true)}
          type="search"
          onKeyDown={keyDownHandler}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Enter the city name"
          className="flex p-2 mr-1 w-3/5 md:w-96 focus:outline-indigo-400 rounded-md bg-blue-100 text-gray-600"
        />
        <SearchButton
          onClick={() => onButtonClick(trimmedSearch)}
          disabled={trimmedSearch === ''}
          onMouseEnter={() => setFocused(false)}
        />
      </span>
      {data && data[0] && showDropdown && focused && (
        <Suggestions
          hide={() => setFocused(false)}
          show={() => setFocused(true)}
          setActiveElement={setActiveElement}
          data={data}
          activeElement={activeElement}
          handleListItemClick={handleListItemClick}
        />
      )}
    </div>
  );
};
