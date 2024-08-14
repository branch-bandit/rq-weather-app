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
    <div
      className="mb-4 p-8 mx-26 w-84 my-3 max-w-3xl text-xl mx-auto text-center font-bold tracking-tight
        text-rose-500 md:text-3xl rounded border-solid border-[1rem] border-indigo-100 shadow-sm shadow-inner md:mb-auto sm:mt-4"
    >
      <h2>{error}</h2>
      <button
        className="py-3 m-auto mt-4 px-6 my-3 text-center font-normal tracking-normal text-base
          border-solid border-2 border-indigo-400 rounded-md bg-indigo-400 text-white shadow"
        onClick={onClick}
      >
        Dismiss
      </button>
    </div>
  );
};
