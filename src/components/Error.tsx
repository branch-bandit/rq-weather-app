import React from 'react';

type ErrorMessageProps = {
  error: string;
  onClick: () => void;
};

export const ErrorMessage = ({
  error,
  onClick,
}: ErrorMessageProps): JSX.Element => {
  return (
    <div className="mb-4 px-8 py-6 mx-20 w-92 max-w-3xl text-xl font-bold tracking-tight text-rose-500 md:text-3xl rounded border-solid border-4 border-rose-200 md:mx-auto">
      <h2>{error}</h2>
      <button
        className="py-2 mt-4 pr-4 pl-4 my-1 mx-2 font-normal tracking-normal text-base pr-8 border-solid border-2 border-indigo-400 rounded-md bg-indigo-400 text-white"
        onClick={onClick}
      >
        Dismiss
      </button>
    </div>
  );
};
