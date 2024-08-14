import React from 'react';

export const CityIcon = ({
  className,
}: {
  className?: string;
}): JSX.Element => (
  <svg
    className={className}
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M14 19.9999V9.82831C14 9.29787 13.7893 8.78916 13.4142 8.41409L10.4142 5.41409C9.63317 4.63304 8.36684 4.63304 7.58579 5.41409L4.58579 8.41409C4.21071 8.78916 4 9.29787 4 9.82831V17.9999C4 19.1045 4.89542 19.9999 5.99998 19.9999L9 19.9999M14 19.9999L19 19.9999C20.1046 19.9999 21 19.1045 21 17.9999V12.8284C21 12.2979 20.7893 11.7892 20.4142 11.4141L18.4142 9.41415C17.6332 8.6331 16.3668 8.6331 15.5858 9.41415L14 10.9999M14 19.9999L9 19.9999M9 19.9999V15.9999"
        stroke="#705acb"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);
