import React from 'react';

export const WindIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element => (
  <svg
    className={className}
    fill="#705acb"
    width="28px"
    height="28px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M22,7a4,4,0,0,1-4,4H5A1,1,0,0,1,5,9H18a2,2,0,1,0-2-2,1,1,0,0,1-2,0,4,4,0,0,1,8,0Zm-4,6H7a1,1,0,0,0,0,2H18a2,2,0,1,1-2,2,1,1,0,0,0-2,0,4,4,0,1,0,4-4ZM8,19a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2ZM2,6A1,1,0,0,0,3,7h8a1,1,0,0,0,0-2H3A1,1,0,0,0,2,6Z"></path>
    </g>
  </svg>
);
